package ua.nytka.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Власний модуль: передає дані віджету головного екрана
        registerPlugin(NytkaWidgetPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
