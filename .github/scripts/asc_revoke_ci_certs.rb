# Відкликає сертифікати розробника, які Xcode створив на попередніх збірках CI («Created via API»).
# Кожна машина GitHub чиста, тож Xcode щоразу робить новий сертифікат, і Apple впирається в ліміт.
# Збірки в TestFlight від цього не страждають: їх підписує окремий сертифікат дистрибуції.
require "openssl"; require "json"; require "net/http"; require "base64"
kid, iss, path = ENV.fetch("KEY_ID"), ENV.fetch("ISSUER_ID"), ENV.fetch("KEY_PATH")
b64 = ->(s) { Base64.urlsafe_encode64(s, padding: false) }
head = b64.(JSON.dump({ alg: "ES256", kid: kid, typ: "JWT" }))
now = Time.now.to_i
body = b64.(JSON.dump({ iss: iss, iat: now, exp: now + 600, aud: "appstoreconnect-v1" }))
key = OpenSSL::PKey::EC.new(File.read(path))
der = key.sign(OpenSSL::Digest::SHA256.new, "#{head}.#{body}")
r, s = OpenSSL::ASN1.decode(der).value.map { |i| i.value.to_s(2).rjust(32, "\0")[-32..] }
jwt = "#{head}.#{body}.#{b64.(r + s)}"
api = ->(meth, url) {
  u = URI(url); req = (meth == :get ? Net::HTTP::Get : Net::HTTP::Delete).new(u)
  req["Authorization"] = "Bearer #{jwt}"
  Net::HTTP.start(u.host, u.port, use_ssl: true) { |h| h.request(req) }
}
res = api.(:get, "https://api.appstoreconnect.apple.com/v1/certificates?limit=200")
abort "Список сертифікатів: HTTP #{res.code} #{res.body[0, 300]}" unless res.code == "200"
certs = JSON.parse(res.body)["data"]
certs.each { |c| a = c["attributes"]; puts "сертифікат: #{a["certificateType"]} | #{a["name"]} | #{a["displayName"]} | до #{a["expirationDate"]}" }
dev = certs.select { |c| a = c["attributes"]
  %w[DEVELOPMENT IOS_DEVELOPMENT].include?(a["certificateType"]) && "#{a["name"]} #{a["displayName"]}".include?("Created via API") }
dev.each { |c| r = api.(:delete, "https://api.appstoreconnect.apple.com/v1/certificates/#{c["id"]}"); puts "відкликано #{c["id"]}: HTTP #{r.code}" }
puts "Відкликано сертифікатів розробника з CI: #{dev.size}"
