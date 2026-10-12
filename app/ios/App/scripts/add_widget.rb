# Додає в Xcode-проєкт розширення-віджет NytkaWidget і власні Swift-файли застосунку.
# Безпечно запускати повторно: якщо все вже є, нічого не змінює.
# Запуск (на Mac): cd app/ios/App && ruby scripts/add_widget.rb
require 'xcodeproj'

proj = Xcodeproj::Project.open(File.join(__dir__, '..', 'App.xcodeproj'))
app = proj.targets.find { |t| t.name == 'App' } or abort 'Не знайшов ціль App'
changed = false

# 1. Власні файли основної цілі
app_group = proj.main_group.children.find { |g| g.respond_to?(:path) && g.path == 'App' } or abort 'Не знайшов групу App'
%w[MainViewController.swift NytkaWidgetPlugin.swift].each do |name|
  next if app_group.files.any? { |f| f.path == name }
  ref = app_group.new_file(name)
  app.add_file_references([ref])
  changed = true
end
unless app_group.files.any? { |f| f.path == 'App.entitlements' }
  app_group.new_file('App.entitlements'); changed = true
end
app.build_configurations.each do |c|
  next if c.build_settings['CODE_SIGN_ENTITLEMENTS'] == 'App/App.entitlements'
  c.build_settings['CODE_SIGN_ENTITLEMENTS'] = 'App/App.entitlements'; changed = true
end

# 2. Ціль-розширення NytkaWidget
unless proj.targets.any? { |t| t.name == 'NytkaWidget' }
  w = proj.new_target(:app_extension, 'NytkaWidget', :ios, '15.0')
  grp = proj.main_group.new_group('NytkaWidget', 'NytkaWidget')
  w.add_file_references([grp.new_file('NytkaWidget.swift')])
  grp.new_file('Info.plist')
  grp.new_file('NytkaWidget.entitlements')
  w.build_configurations.each do |c|
    s = c.build_settings
    s['PRODUCT_NAME'] = 'NytkaWidget'
    s['PRODUCT_BUNDLE_IDENTIFIER'] = 'ua.nytka.app.widget'
    s['INFOPLIST_FILE'] = 'NytkaWidget/Info.plist'
    s['CODE_SIGN_ENTITLEMENTS'] = 'NytkaWidget/NytkaWidget.entitlements'
    s['GENERATE_INFOPLIST_FILE'] = 'NO'
    s['SWIFT_VERSION'] = '5.0'
    s['TARGETED_DEVICE_FAMILY'] = '1,2'
    s['IPHONEOS_DEPLOYMENT_TARGET'] = '15.0'
    s['MARKETING_VERSION'] = app.build_configurations.first.build_settings['MARKETING_VERSION'] || '1.0'
    s['CURRENT_PROJECT_VERSION'] = app.build_configurations.first.build_settings['CURRENT_PROJECT_VERSION'] || '1'
    s['SKIP_INSTALL'] = 'YES'
    s['LD_RUNPATH_SEARCH_PATHS'] = ['$(inherited)', '@executable_path/Frameworks', '@executable_path/../../Frameworks']
  end
  w.add_system_frameworks(%w[WidgetKit SwiftUI])
  app.add_dependency(w)
  embed = app.new_copy_files_build_phase('Embed Foundation Extensions')
  embed.symbol_dst_subfolder_spec = :plug_ins
  bf = embed.add_file_reference(w.product_reference, true)
  bf.settings = { 'ATTRIBUTES' => ['RemoveHeadersOnCopy'] }
  changed = true
end

if changed
  proj.save
  puts 'Проєкт оновлено'
else
  puts 'Змін немає'
end
