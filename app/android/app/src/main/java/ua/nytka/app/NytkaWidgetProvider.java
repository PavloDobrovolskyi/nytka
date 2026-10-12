package ua.nytka.app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.view.View;
import android.widget.RemoteViews;
import org.json.JSONArray;
import org.json.JSONObject;

/** Віджет «Фокус тижня»: знак-вишивка цінності, її назва і маленький крок. */
public class NytkaWidgetProvider extends AppWidgetProvider {
    static final String PREFS = "nytka_widget";

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) mgr.updateAppWidget(id, build(ctx));
    }

    static void updateAll(Context ctx) {
        AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
        int[] ids = mgr.getAppWidgetIds(new ComponentName(ctx, NytkaWidgetProvider.class));
        for (int id : ids) mgr.updateAppWidget(id, build(ctx));
    }

    static RemoteViews build(Context ctx) {
        RemoteViews v = new RemoteViews(ctx.getPackageName(), R.layout.widget_nytka);
        String label = "Фокус тижня", name = "", step = "", empty = "Відкрий «Нитку» й обери цінність тижня", color = "#c81e2a";
        JSONArray cells = null;
        try {
            JSONObject o = new JSONObject(ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString("data", "{}"));
            label = o.optString("label", label);
            name = o.optString("name", "");
            step = o.optString("step", "");
            empty = o.optString("empty", empty);
            color = o.optString("color", color);
            cells = o.optJSONArray("cells");
        } catch (Exception ignored) { }

        boolean night = (ctx.getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES;
        v.setTextViewText(R.id.w_label, label.toUpperCase());
        if (name.isEmpty()) {
            v.setTextViewText(R.id.w_name, "Нитка");
            v.setTextViewText(R.id.w_step, empty);
        } else {
            v.setTextViewText(R.id.w_name, name);
            v.setTextViewText(R.id.w_step, step);
        }
        if (cells != null && cells.length() > 0) {
            v.setImageViewBitmap(R.id.w_sign, sign(cells, parse(color, Color.rgb(200, 30, 42)), night ? Color.rgb(239, 238, 233) : Color.rgb(21, 21, 20)));
            v.setViewVisibility(R.id.w_sign, View.VISIBLE);
        } else {
            v.setViewVisibility(R.id.w_sign, View.GONE);
        }

        Intent open = new Intent(ctx, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pi = PendingIntent.getActivity(ctx, 0, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        v.setOnClickPendingIntent(R.id.w_root, pi);
        return v;
    }

    static int parse(String hex, int fallback) {
        try { return Color.parseColor(hex); } catch (Exception e) { return fallback; }
    }

    /** Малює знак 11×11 хрестиками: значення 1 — темна нитка, 2 — колір теми цінності. */
    static Bitmap sign(JSONArray cells, int color, int ink) {
        int u = 12, size = 11 * u;
        Bitmap bmp = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888);
        Canvas c = new Canvas(bmp);
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
        p.setStyle(Paint.Style.STROKE);
        p.setStrokeCap(Paint.Cap.ROUND);
        p.setStrokeWidth(u * 0.26f);
        float pad = u * 0.2f;
        for (int i = 0; i < cells.length(); i++) {
            JSONArray cell = cells.optJSONArray(i);
            if (cell == null) continue;
            float x = cell.optInt(0) * u, y = cell.optInt(1) * u;
            p.setColor(cell.optInt(2) == 1 ? ink : color);
            c.drawLine(x + pad, y + pad, x + u - pad, y + u - pad, p);
            c.drawLine(x + u - pad, y + pad, x + pad, y + u - pad, p);
        }
        return bmp;
    }
}
