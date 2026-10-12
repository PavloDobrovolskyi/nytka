import WidgetKit
import SwiftUI

/// Дані, які кладе застосунок (див. app/src/ui.js → onDataChange).
struct NytkaData: Decodable {
    let lang: String?
    let label: String?
    let empty: String?
    let name: String?
    let step: String?
    let color: String?
    let cells: [[Int]]?
}

func loadData() -> NytkaData? {
    guard let s = UserDefaults(suiteName: "group.ua.nytka.app")?.string(forKey: "widget"),
          let d = s.data(using: .utf8) else { return nil }
    return try? JSONDecoder().decode(NytkaData.self, from: d)
}

struct NytkaEntry: TimelineEntry {
    let date: Date
    let data: NytkaData?
}

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> NytkaEntry { NytkaEntry(date: Date(), data: nil) }
    func getSnapshot(in context: Context, completion: @escaping (NytkaEntry) -> Void) {
        completion(NytkaEntry(date: Date(), data: loadData()))
    }
    func getTimeline(in context: Context, completion: @escaping (Timeline<NytkaEntry>) -> Void) {
        let entry = NytkaEntry(date: Date(), data: loadData())
        completion(Timeline(entries: [entry], policy: .after(Date().addingTimeInterval(6 * 3600))))
    }
}

extension Color {
    init(hex: String) {
        var v: UInt64 = 0
        Scanner(string: hex.replacingOccurrences(of: "#", with: "")).scanHexInt64(&v)
        self.init(red: Double((v >> 16) & 0xFF) / 255, green: Double((v >> 8) & 0xFF) / 255, blue: Double(v & 0xFF) / 255)
    }
}

/// Знак-вишивка: сітка 11×11, хрестики (1 — темна нитка, 2 — колір теми цінності).
struct SignView: View {
    let cells: [[Int]]
    let color: Color
    let ink: Color
    var body: some View {
        Canvas { ctx, size in
            let u = min(size.width, size.height) / 11, p = u * 0.2
            for c in cells where c.count >= 3 {
                let x = CGFloat(c[0]) * u, y = CGFloat(c[1]) * u
                var path = Path()
                path.move(to: CGPoint(x: x + p, y: y + p)); path.addLine(to: CGPoint(x: x + u - p, y: y + u - p))
                path.move(to: CGPoint(x: x + u - p, y: y + p)); path.addLine(to: CGPoint(x: x + p, y: y + u - p))
                ctx.stroke(path, with: .color(c[2] == 1 ? ink : color), style: StrokeStyle(lineWidth: u * 0.26, lineCap: .round))
            }
        }
    }
}

struct NytkaWidgetView: View {
    var entry: NytkaEntry
    @Environment(\.colorScheme) var scheme
    @Environment(\.widgetFamily) var family

    var body: some View {
        let d = entry.data
        let dark = scheme == .dark
        let ink = dark ? Color(hex: "#efeee9") : Color(hex: "#151514")
        let muted = dark ? Color(hex: "#a3a097") : Color(hex: "#67655f")
        let bg = dark ? Color(hex: "#1b1b19") : Color(hex: "#fbfbf8")
        let name = d?.name ?? ""
        VStack(alignment: .leading, spacing: 5) {
            HStack(spacing: 8) {
                if let cells = d?.cells, !cells.isEmpty {
                    SignView(cells: cells, color: Color(hex: d?.color ?? "#c81e2a"), ink: ink).frame(width: 30, height: 30)
                }
                Text((d?.label ?? "Фокус тижня").uppercased())
                    .font(.system(size: 9.5, weight: .semibold)).foregroundColor(muted).lineLimit(1)
            }
            if name.isEmpty {
                Text("Нитка").font(.system(size: 17, weight: .bold)).foregroundColor(ink)
                Text(d?.empty ?? "Відкрий «Нитку» й обери цінність тижня")
                    .font(.system(size: 12)).foregroundColor(muted).lineLimit(3)
            } else {
                Text(name).font(.system(size: 18, weight: .bold)).foregroundColor(ink).lineLimit(1).minimumScaleFactor(0.7)
                Text(d?.step ?? "").font(.system(size: 12)).foregroundColor(muted).lineLimit(family == .systemSmall ? 3 : 4)
            }
            Spacer(minLength: 0)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .widgetBackground(bg)
    }
}

extension View {
    @ViewBuilder func widgetBackground(_ color: Color) -> some View {
        if #available(iOSApplicationExtension 17.0, *) {
            containerBackground(color, for: .widget)
        } else {
            padding().background(color)
        }
    }
}

@main
struct NytkaWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "NytkaWidget", provider: Provider()) { entry in
            NytkaWidgetView(entry: entry)
        }
        .configurationDisplayName("Нитка")
        .description("Фокус тижня і маленький крок до нього")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
