import UIKit
import Capacitor

/// Головний екран застосунку. Тут реєструються власні нативні модулі.
class MainViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(NytkaWidgetPlugin())
    }
}
