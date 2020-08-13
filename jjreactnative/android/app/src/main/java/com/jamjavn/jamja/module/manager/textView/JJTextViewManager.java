package com.jamjavn.jamja.module.manager.textView;

import android.text.Spannable;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.text.ReactTextAnchorViewManager;
import com.facebook.react.views.text.ReactTextShadowNode;
import com.facebook.react.views.text.ReactTextUpdate;
import com.facebook.react.views.text.TextInlineImageSpan;

/**
 * Created by sinhphan on 1/12/19.
 * Email: pnsinh.hg92@gmail.com
 **/

public class JJTextViewManager extends ReactTextAnchorViewManager<JJTextView, ReactTextShadowNode> {

    public JJTextViewManager() {
    }

    public String getName() {
        return "JJTextView";
    }

    public JJTextView createViewInstance(ThemedReactContext context) {
        return new JJTextView(context);
    }

    public void updateExtraData(JJTextView view, Object extraData) {
        if (extraData == null) return;
        ReactTextUpdate update = (ReactTextUpdate)extraData;
        if (update.getText() == null) return;

        if (update.containsImages()) {
            Spannable spannable = update.getText();
            TextInlineImageSpan.possiblyUpdateInlineImageSpans(spannable, view);
        }

        view.setText(update);
    }

    public ReactTextShadowNode createShadowNodeInstance() {
        return new ReactTextShadowNode();
    }

    public Class<ReactTextShadowNode> getShadowNodeClass() {
        return ReactTextShadowNode.class;
    }

    protected void onAfterUpdateTransaction(JJTextView view) {
        super.onAfterUpdateTransaction(view);
        view.updateView();
    }
}

