import React, { useEffect, useState } from "react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [autoHidden, setAutoHidden] = useState(false);
  const [autoRemove, setAutoRemove] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // منع النافذة التلقائية
      e.preventDefault();
      // حفظ الحدث
      setDeferredPrompt(e);
    });

    setTimeout(() => {
      setAutoHidden(true);
      setTimeout(() => {
        setAutoRemove(true);
      }, 1000);
    }, 5000);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };
  if (!deferredPrompt) return;
  return (
    <div
      className={`App fixed top-20 border py-4 px-6 rounded-xl right-[50%] translate-x-[50%] bg-slate-100 dark:bg-gray-900 dark:text-white shadow-md duration-1000 ${
        autoHidden ? "opacity-0" : ""
      } ${autoRemove ? "hidden" : ""}`}
    >
      <header className="App-header flex items-center gap-4">
        <span className="font-medium text-nowrap">هل قمت بتثبيت التطبيق</span>
        <button className="btn btn-primary" onClick={handleInstallClick}>
          تثبيت
        </button>
      </header>
    </div>
  );
}
