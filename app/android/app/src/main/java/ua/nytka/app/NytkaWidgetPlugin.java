package ua.nytka.app;

import android.content.Context;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/** Отримує з застосунку JSON для віджета (фокус тижня, крок, знак) і оновлює віджети. */
@CapacitorPlugin(name = "NytkaWidget")
public class NytkaWidgetPlugin extends Plugin {
    @PluginMethod
    public void update(PluginCall call) {
        String json = call.getString("json", "{}");
        Context ctx = getContext();
        ctx.getSharedPreferences(NytkaWidgetProvider.PREFS, Context.MODE_PRIVATE).edit().putString("data", json).apply();
        NytkaWidgetProvider.updateAll(ctx);
        call.resolve();
    }
}
