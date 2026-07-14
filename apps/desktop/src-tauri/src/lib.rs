use tauri_plugin_dialog::{DialogExt, MessageDialogButtons};
use tauri_plugin_updater::UpdaterExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                if let Err(e) = check_for_updates(handle).await {
                    eprintln!("updater: {e}");
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running ASTRON");
}

/// Check the GitHub release manifest for a newer version and, with the
/// user's consent, install it and restart. Errors are logged, never fatal —
/// the app must work offline.
async fn check_for_updates(app: tauri::AppHandle) -> tauri_plugin_updater::Result<()> {
    let Some(update) = app.updater()?.check().await? else {
        return Ok(());
    };

    let proceed = tauri::async_runtime::spawn_blocking({
        let app = app.clone();
        let version = update.version.clone();
        move || {
            app.dialog()
                .message(format!(
                    "ASTRON {version} is available. Install it now? The app will restart."
                ))
                .title("Update available")
                .buttons(MessageDialogButtons::OkCancelCustom(
                    "Install & Restart".into(),
                    "Later".into(),
                ))
                .blocking_show()
        }
    })
    .await
    .unwrap_or(false);

    if proceed {
        update.download_and_install(|_, _| {}, || {}).await?;
        app.restart();
    }
    Ok(())
}
