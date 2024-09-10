function getResumes() {
    return JSON.parse(localStorage.getItem('resumes')) || [];
}

function saveResumes(resumes) {
    localStorage.setItem('resumes', JSON.stringify(resumes));
}

function getResumeById(id) {
    const resumes = getResumes();
    return resumes.find(r => r.id === id);
}

function saveResume(resume) {
    const resumes = getResumes();
    const index = resumes.findIndex(r => r.id === resume.id);
    if (index !== -1) {
        resumes[index] = resume;
    } else {
        resumes.push(resume);
    }
    saveResumes(resumes);
}

function deleteResume(id) {
    const resumes = getResumes();
    const updatedResumes = resumes.filter(r => r.id !== id);
    saveResumes(updatedResumes);
}

function createNewResume() {
    console.log("创建新简历函数被调用");
    const resumes = getResumes();
    const newResume = JSON.parse(JSON.stringify(window.resumeConfig));
    newResume.id = Date.now();
    newResume.name = newResume.name || "新简历";  // 如果 name 为空，设置一个默认值
    newResume.title = newResume.title || "职位未设置";  // 如果 title 为空，设置一个默认值
    resumes.push(newResume);
    saveResumes(resumes);
    window.loadResumeList();
}

// 将函数暴露到全局作用域
window.resumeService = {
    getResumes,
    saveResumes,
    getResumeById,
    saveResume,
    deleteResume,
    createNewResume
};