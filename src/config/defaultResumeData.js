// 确保 defaultResumeData_zh 和 defaultResumeData_en 已经被加载
if (typeof window.defaultResumeData_zh === 'undefined' || typeof window.defaultResumeData_en === 'undefined') {
    console.error('Default resume data not loaded properly');
}

// 根据当前语言获取相应的数据
function getDefaultResumeData() {
    const currentLang = localStorage.getItem('language') || 'zh';
    return currentLang === 'zh' ? window.defaultResumeData_zh : window.defaultResumeData_en;
}

// 导出默认简历数据
window.defaultResumeData = getDefaultResumeData();

// 添加一个函数来更新默认简历数据
window.updateDefaultResumeData = function() {
    window.defaultResumeData = getDefaultResumeData();
};

// 为了调试，输出加载的数据
console.log('Loaded default resume data:', window.defaultResumeData);