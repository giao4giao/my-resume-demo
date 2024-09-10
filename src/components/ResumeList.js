function ResumeList() {
    // 加载并显示简历列表
    function loadResumeList() {
        const resumeList = document.getElementById('resume-list');
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
    }

    // 处理删除简历的操作
    function handleDeleteResume(index) {
        const resumes = window.resumeService.getResumes();
        window.resumeService.deleteResume(resumes[index].id);
        loadResumeList();
    }

    // 返回公共方法
    return {
        loadResumeList,
        handleDeleteResume,
        getResumes: window.resumeService.getResumes
    };
}

// 将ResumeList暴露到全局作用域
window.ResumeList = ResumeList;