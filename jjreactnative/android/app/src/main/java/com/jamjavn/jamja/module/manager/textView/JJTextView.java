package com.jamjavn.jamja.module.manager.textView;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.text.Html;
import android.text.Layout;
import android.text.Spanned;
import android.text.TextUtils;
import android.text.method.LinkMovementMethod;
import android.text.util.Linkify;
import android.util.Log;
import android.view.ViewGroup;

import com.facebook.react.views.text.ReactTagSpan;
import com.facebook.react.views.text.ReactTextUpdate;
import com.facebook.react.views.text.ReactTextView;
import com.facebook.react.views.text.TextInlineImageSpan;
import com.facebook.react.views.view.ReactViewBackgroundManager;

import javax.annotation.Nullable;

/**
 * Created by sinhphan on 1/12/19.
 * Email: pnsinh.hg92@gmail.com
 **/
@SuppressLint("AppCompatCustomView")
public class JJTextView extends ReactTextView {

    private static final ViewGroup.LayoutParams EMPTY_LAYOUT_PARAMS = new ViewGroup.LayoutParams(0, 0);
    private boolean mContainsImages;
    private int mDefaultGravityHorizontal;
    private int mDefaultGravityVertical;
    private boolean mTextIsSelectable;
    private float mLineHeight = 0.0f;
    private int mTextAlign = 0;
    private int mNumberOfLines = 2147483647;
    private TextUtils.TruncateAt mEllipsizeLocation;
    private ReactViewBackgroundManager mReactBackgroundManager;

    public JJTextView(Context context) {
        super(context);
        this.mEllipsizeLocation = TextUtils.TruncateAt.END;
        this.mReactBackgroundManager = new ReactViewBackgroundManager(this);
        this.mDefaultGravityHorizontal = this.getGravity() & 8388615;
        this.mDefaultGravityVertical = this.getGravity() & 112;
    }

    public void setText(ReactTextUpdate update) {
        this.mContainsImages = update.containsImages();
        if (this.getLayoutParams() == null) {
            this.setLayoutParams(EMPTY_LAYOUT_PARAMS);
        }

        String text = update.getText().toString();

        Log.e("JAMJA", "setText: " + text);
        if (text.contains("<html") || text.contains("<body>") || text.contains("<p>")) {
            this.setText(Html.fromHtml(update.getText().toString()));
            Linkify.addLinks(this, Linkify.ALL);
            this.setMovementMethod(LinkMovementMethod.getInstance());
        }
        else {
            this.setText(update.getText());
        }

        this.setPadding((int)Math.floor((double)update.getPaddingLeft()), (int)Math.floor((double)update.getPaddingTop()), (int)Math.floor((double)update.getPaddingRight()), (int)Math.floor((double)update.getPaddingBottom()));
        int nextTextAlign = update.getTextAlign();
        if (this.mTextAlign != nextTextAlign) {
            this.mTextAlign = nextTextAlign;
        }

        this.setGravityHorizontal(this.mTextAlign);
        if (Build.VERSION.SDK_INT >= 23 && this.getBreakStrategy() != update.getTextBreakStrategy()) {
            this.setBreakStrategy(update.getTextBreakStrategy());
        }

    }

    public int reactTagForTouch(float touchX, float touchY) {
        CharSequence text = this.getText();
        int target = this.getId();
        int x = (int)touchX;
        int y = (int)touchY;
        Layout layout = this.getLayout();
        if (layout == null) {
            return target;
        } else {
            int line = layout.getLineForVertical(y);
            int lineStartX = (int)layout.getLineLeft(line);
            int lineEndX = (int)layout.getLineRight(line);
            if (text instanceof Spanned && x >= lineStartX && x <= lineEndX) {
                Spanned spannedText = (Spanned)text;
                int index = layout.getOffsetForHorizontal(line, (float)x);
                ReactTagSpan[] spans = (ReactTagSpan[])spannedText.getSpans(index, index, ReactTagSpan.class);
                if (spans != null) {
                    int targetSpanTextLength = text.length();

                    for(int i = 0; i < spans.length; ++i) {
                        int spanStart = spannedText.getSpanStart(spans[i]);
                        int spanEnd = spannedText.getSpanEnd(spans[i]);
                        if (spanEnd > index && spanEnd - spanStart <= targetSpanTextLength) {
                            target = spans[i].getReactTag();
                            targetSpanTextLength = spanEnd - spanStart;
                        }
                    }
                }
            }

            return target;
        }
    }

    public void setTextIsSelectable(boolean selectable) {
        this.mTextIsSelectable = selectable;
        super.setTextIsSelectable(selectable);
    }

    protected boolean verifyDrawable(Drawable drawable) {
        if (this.mContainsImages && this.getText() instanceof Spanned) {
            Spanned text = (Spanned)this.getText();
            TextInlineImageSpan[] spans = (TextInlineImageSpan[])text.getSpans(0, text.length(), TextInlineImageSpan.class);
            TextInlineImageSpan[] var4 = spans;
            int var5 = spans.length;

            for(int var6 = 0; var6 < var5; ++var6) {
                TextInlineImageSpan span = var4[var6];
                if (span.getDrawable() == drawable) {
                    return true;
                }
            }
        }

        return super.verifyDrawable(drawable);
    }

    public void invalidateDrawable(Drawable drawable) {
        if (this.mContainsImages && this.getText() instanceof Spanned) {
            Spanned text = (Spanned)this.getText();
            TextInlineImageSpan[] spans = (TextInlineImageSpan[])text.getSpans(0, text.length(), TextInlineImageSpan.class);
            TextInlineImageSpan[] var4 = spans;
            int var5 = spans.length;

            for(int var6 = 0; var6 < var5; ++var6) {
                TextInlineImageSpan span = var4[var6];
                if (span.getDrawable() == drawable) {
                    this.invalidate();
                }
            }
        }

        super.invalidateDrawable(drawable);
    }

    public void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        if (this.mContainsImages && this.getText() instanceof Spanned) {
            Spanned text = (Spanned)this.getText();
            TextInlineImageSpan[] spans = (TextInlineImageSpan[])text.getSpans(0, text.length(), TextInlineImageSpan.class);
            TextInlineImageSpan[] var3 = spans;
            int var4 = spans.length;

            for(int var5 = 0; var5 < var4; ++var5) {
                TextInlineImageSpan span = var3[var5];
                span.onDetachedFromWindow();
            }
        }

    }

    public void onStartTemporaryDetach() {
        super.onStartTemporaryDetach();
        if (this.mContainsImages && this.getText() instanceof Spanned) {
            Spanned text = (Spanned)this.getText();
            TextInlineImageSpan[] spans = (TextInlineImageSpan[])text.getSpans(0, text.length(), TextInlineImageSpan.class);
            TextInlineImageSpan[] var3 = spans;
            int var4 = spans.length;

            for(int var5 = 0; var5 < var4; ++var5) {
                TextInlineImageSpan span = var3[var5];
                span.onStartTemporaryDetach();
            }
        }

    }

    public void onAttachedToWindow() {
        super.onAttachedToWindow();
        if (this.mContainsImages && this.getText() instanceof Spanned) {
            Spanned text = (Spanned)this.getText();
            TextInlineImageSpan[] spans = (TextInlineImageSpan[])text.getSpans(0, text.length(), TextInlineImageSpan.class);
            TextInlineImageSpan[] var3 = spans;
            int var4 = spans.length;

            for(int var5 = 0; var5 < var4; ++var5) {
                TextInlineImageSpan span = var3[var5];
                span.onAttachedToWindow();
            }
        }

    }

    public void onFinishTemporaryDetach() {
        super.onFinishTemporaryDetach();
        if (this.mContainsImages && this.getText() instanceof Spanned) {
            Spanned text = (Spanned)this.getText();
            TextInlineImageSpan[] spans = (TextInlineImageSpan[])text.getSpans(0, text.length(), TextInlineImageSpan.class);
            TextInlineImageSpan[] var3 = spans;
            int var4 = spans.length;

            for(int var5 = 0; var5 < var4; ++var5) {
                TextInlineImageSpan span = var3[var5];
                span.onFinishTemporaryDetach();
            }
        }

    }

    void setGravityHorizontal(int gravityHorizontal) {
        if (gravityHorizontal == 0) {
            gravityHorizontal = this.mDefaultGravityHorizontal;
        }

        this.setGravity(this.getGravity() & -8 & -8388616 | gravityHorizontal);
    }

    void setGravityVertical(int gravityVertical) {
        if (gravityVertical == 0) {
            gravityVertical = this.mDefaultGravityVertical;
        }

        this.setGravity(this.getGravity() & -113 | gravityVertical);
    }

    public void setNumberOfLines(int numberOfLines) {
        this.mNumberOfLines = numberOfLines == 0 ? 2147483647 : numberOfLines;
        this.setSingleLine(this.mNumberOfLines == 1);
        this.setMaxLines(this.mNumberOfLines);
    }

    public void setEllipsizeLocation(TextUtils.TruncateAt ellipsizeLocation) {
        this.mEllipsizeLocation = ellipsizeLocation;
    }

    public void updateView() {
        TextUtils.TruncateAt ellipsizeLocation = this.mNumberOfLines == 2147483647 ? null : this.mEllipsizeLocation;
        this.setEllipsize(ellipsizeLocation);
    }

    public void setBackgroundColor(int color) {
        this.mReactBackgroundManager.setBackgroundColor(color);
    }

    public void setBorderWidth(int position, float width) {
        this.mReactBackgroundManager.setBorderWidth(position, width);
    }

    public void setBorderColor(int position, float color, float alpha) {
        this.mReactBackgroundManager.setBorderColor(position, color, alpha);
    }

    public void setBorderRadius(float borderRadius) {
        this.mReactBackgroundManager.setBorderRadius(borderRadius);
    }

    public void setBorderRadius(float borderRadius, int position) {
        this.mReactBackgroundManager.setBorderRadius(borderRadius, position);
    }

    public void setBorderStyle(@Nullable String style) {
        this.mReactBackgroundManager.setBorderStyle(style);
    }
}
