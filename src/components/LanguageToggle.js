window.addLanguageToggle = function() {
    const body = document.body;
    const toggleButton = document.createElement('button');
    toggleButton.id = 'language-toggle';
    toggleButton.innerHTML = localStorage.getItem('language') === 'en' ? '中' : 'En';
    toggleButton.title = localStorage.getItem('language') === 'en' ? '切换到中文' : 'Switch to English';
    
    toggleButton.addEventListener('click', function() {
        const currentLang = localStorage.getItem('language') || 'zh';
        const newLang = currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('language', newLang);
        toggleButton.innerHTML = newLang === 'en' ? '中' : 'En';
        toggleButton.title = newLang === 'en' ? '切换到中文' : 'Switch to English';
        
        // 更新 html 标签的 lang 属性
        document.documentElement.lang = newLang;

        // 更新默认简历数据
        if (typeof window.updateDefaultResumeData === 'function') {
            window.updateDefaultResumeData();
        }

        // 更新UI语言
        if (typeof window.updateUILanguage === 'function') {
            window.updateUILanguage();
        }
        
        // 重新加载页面以应用新语言
        window.location.reload();
    });

    body.appendChild(toggleButton);
};