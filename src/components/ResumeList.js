function ResumeList() {
    let allResumes = [];
    let isShowingAll = false;

    function loadResumeList() {
        const resumeList = document.getElementById('resume-list');
        if (!resumeList) {
            console.error('Resume list element not found');
            return;
        }
        resumeList.innerHTML = '';
        allResumes = window.resumeService.getResumes();
        
        const currentLang = localStorage.getItem('language') || 'zh';
        const translations = window.translations[currentLang];
        
        const displayedResumes = isShowingAll ? allResumes : allResumes.slice(0,6);
        renderResumes(displayedResumes, translations);

        if (allResumes.length > 6) {
            const showMoreButton = document.createElement('button');
            showMoreButton.id = 'show-more-btn';
            showMoreButton.textContent = isShowingAll ? translations.showLess : translations.showMore;
            showMoreButton.addEventListener('click', toggleShowMore);
            resumeList.appendChild(showMoreButton);
        }

        const event = new CustomEvent('resumeListLoaded');
        document.dispatchEvent(event);
    }

    function renderResumes(resumes, translations) {
        const resumeList = document.getElementById('resume-list');
        resumeList.innerHTML = '';
        
        resumes.forEach((resume, index) => {
            const resumeItem = document.createElement('div');
            resumeItem.className = 'resume-item';
            
            let avatarHtml = '';
            if (resume[resume.type] && resume[resume.type].avatar) {
                avatarHtml = `<img src="${resume[resume.type].avatar}" alt="${translations.avatar}" class="resume-list-avatar">`;
            }
            
            resumeItem.innerHTML = `
                <div class="resume-item-content">
                    ${avatarHtml}
                    <span>${resume.name || translations.unnamed} - ${resume.title || translations.unsetTitle}</span>
                </div>
                <div class="resume-item-buttons">
                    <button onclick="window.editResume(${index})">${translations.edit}</button>
                    <button onclick="window.deleteResume(${index})">${translations.delete}</button>
                </div>
            `;
            resumeList.appendChild(resumeItem);
        });
    }

    function toggleShowMore() {
        isShowingAll = !isShowingAll;
        loadResumeList();
    }

    return {
        loadResumeList
    };
}

// 将ResumeList暴露到全局作用域
window.ResumeList = ResumeList;