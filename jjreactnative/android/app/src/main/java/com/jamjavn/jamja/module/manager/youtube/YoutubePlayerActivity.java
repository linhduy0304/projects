package com.jamjavn.jamja.module.manager.youtube;

import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.WindowManager;
import android.widget.Toast;

import com.google.android.youtube.player.YouTubeBaseActivity;
import com.google.android.youtube.player.YouTubeInitializationResult;
import com.google.android.youtube.player.YouTubePlayer;
import com.google.android.youtube.player.YouTubePlayerView;
import com.jamjavn.jamja.R;
import com.jamjavn.jamja.config.JJConfig;
import com.jamjavn.jamja.util.Constant;

/**
 * Created by sinhphan on 11/23/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class YoutubePlayerActivity extends YouTubeBaseActivity implements YouTubePlayer.OnInitializedListener {

    private YouTubePlayer youTubePlayer;
    private String videoId;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_youtube_player);

        findViewById(R.id.button_back).setOnClickListener(v -> onBackPressed());

        handlePassData();

        try {
            YouTubePlayerView youTubePlayerView = findViewById(R.id.player_view);
            youTubePlayerView.initialize(JJConfig.GOOGLE_API_KEY, this);
        } catch (Exception e) {
            Log.e("YoutubePlayerActivity", "initialize error", e);
            toastError();
        }
    }

    private void handlePassData() {
        try {
            if (getIntent() == null || getIntent().getExtras() == null) {
                toastError();
                return;
            }
            videoId = getIntent().getExtras().getString(Constant.KEY_YOUTUBE_VIDEO_ID);

            if (videoId != null && videoId.contains("http")) {
                try {
                    Uri uri = Uri.parse(videoId);
                    if (uri == null) return;

                    videoId = uri.getQueryParameter("v");

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            Log.e("YoutubePlayerActivity", "handle pass data", e);
            toastError();
        }
    }

    private void toastError() {
        Toast.makeText(this, "Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau!", Toast.LENGTH_LONG).show();
    }

    @Override
    public void onInitializationSuccess(YouTubePlayer.Provider provider, YouTubePlayer youTubePlayer, boolean b) {
        Log.i("YoutubePlayerActivity", "onInitializationSuccess");
        try {
            if (videoId == null) return;

            this.youTubePlayer = youTubePlayer;
            youTubePlayer.loadVideo(videoId);

        } catch (Exception e) {
            Log.e("YoutubePlayerActivity", "load error", e);
            toastError();
        }
    }

    @Override
    public void onInitializationFailure(YouTubePlayer.Provider provider, YouTubeInitializationResult youTubeInitializationResult) {
        Log.e("YoutubePlayerActivity", "onInitializationFailure: " + youTubeInitializationResult);
        toastError();
    }

    @Override
    protected void onDestroy() {
        try {
            if (youTubePlayer != null) {
                youTubePlayer.pause();
                youTubePlayer.release();
            }
            youTubePlayer = null;
        } catch (Exception e) {
            Log.e("YoutubePlayerActivity", "release error", e);
            toastError();
        }
        super.onDestroy();
    }
}
