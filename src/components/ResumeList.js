function ResumeList() {
    // 加载并显示简历列表
    function loadResumeList() {
        const resumeList = document.getElementById('resume-list');
        if (!resumeList) {
            console.error('Resume list element not found');
            return;
        }
        resumeList.innerHTML = '';
        const resumes = window.resumeService.getResumes();
        resumes.forEach((resume, index) => {
            const resumeItem = document.createElement('div');
            resumeItem.className = 'resume-item';
            resumeItem.innerHTML = `
                <span>${resume.name || '未命名'} - ${resume.title || '未设置职位'}</span>
                <div>
                    <button onclick="window.editResume(${index})">编辑</button>
                    <button onclick="window.deleteResume(${index})">删除</button>
                </div>
            `;
            resumeList.appendChild(resumeItem);
        });

        // 触发自定义事件
        const event = new CustomEvent('resumeListLoaded');
        document.dispatchEvent(event);
    }

    // 返回公共方法
    return {
        loadResumeList
    };
}

// 将ResumeList暴露到全局作用域
window.ResumeList = ResumeList;