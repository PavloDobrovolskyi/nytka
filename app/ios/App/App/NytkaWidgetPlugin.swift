import Foundation
import Capacitor
import WidgetKit

/// Отримує з застосунку JSON для віджета (фокус тижня, крок, знак) і просить iOS оновити віджети.
@objc(NytkaWidgetPlugin)
public class NytkaWidgetPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "NytkaWidgetPlugin"
    public let jsName = "NytkaWidget"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "update", returnType: CAPPluginReturnPromise)
    ]
    static let group = "group.ua.nytka.app"

    @objc func update(_ call: CAPPluginCall) {
        let json = call.getString("json") ?? "{}"
        UserDefaults(suiteName: NytkaWidgetPlugin.group)?.set(json, forKey: "widget")
        WidgetCenter.shared.reloadAllTimelines()
        call.resolve()
    }
}
