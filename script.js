let currentResumeId = null;
let selectedTemplate = null;

document.addEventListener('DOMContentLoaded', function() {
    loadResumeList();
    document.getElementById('create-resume-btn').addEventListener('click', showTemplateSelector);
    document.getElementById('confirm-template').addEventListener('click', createNewResume);
    document.getElementById('save-btn').addEventListener('click', saveCurrentResume);
    document.getElementById('download-btn').addEventListener('click', downloadPDF);
    document.getElementById('back-btn').addEventListener('click', showResumeList);
    document.getElementById('advanced-edit-btn').addEventListener('click', showAdvancedEditor);
    document.getElementById('apply-json-btn').addEventListener('click', applyJsonChanges);
    document.getElementById('cancel-advanced-edit-btn').addEventListener('click', hideAdvancedEditor);
    document.getElementById('add-avatar-btn').addEventListener('click', triggerAvatarUpload);
    document.getElementById('avatar-input').addEventListener('change', handleAvatarUpload);
    document.getElementById('change-template-btn').addEventListener('click', showTemplateSelector);

    // 填充模板选择器
    const templateSelect = document.getElementById('template-select');
    for (let key in resumeTemplates) {
        let option = document.createElement('option');
        option.value = key;
        option.textContent = resumeTemplates[key].name;
        templateSelect.appendChild(option);
    }
});

function showTemplateSelector() {
    const resumeEditor = document.getElementById('resume-editor');
    const templateSelector = document.getElementById('template-selector');
    
    resumeEditor.classList.add('fade-out');
    setTimeout(() => {
        resumeEditor.style.display = 'none';
        templateSelector.style.display = 'block';
        templateSelector.classList.add('fade-in');
        setTimeout(() => {
            templateSelector.classList.add('visible');
        }, 50);
        
        // 清空并重新填充模板选择器
        const templateSelect = document.getElementById('template-select');
        templateSelect.innerHTML = '';
        for (let key in resumeTemplates) {
            let option = document.createElement('option');
            option.value = key;
            option.textContent = resumeTemplates[key].name;
            templateSelect.appendChild(option);
        }
        
        // 添加预览图片
        updateTemplatePreview();
        
        // 监听模板选择变化
        templateSelect.addEventListener('change', updateTemplatePreview);
    }, 300);
}

function updateTemplatePreview() {
    const templateKey = document.getElementById('template-select').value;
    const previewContainer = document.getElementById('template-preview-container');
    previewContainer.innerHTML = '';

    if (resumeTemplates[templateKey].preview) {
        const previewImg = document.createElement('img');
        previewImg.id = 'template-preview';
        previewImg.alt = "模板预览";
        previewImg.style.maxWidth = '100%';
        
        previewImg.onerror = function() {
            console.error('模板预览图加载失败：', resumeTemplates[templateKey].preview);
            createDefaultPreview(previewContainer);
        };
        
        previewImg.onload = function() {
            console.log('模板预览图加载成功：', this.src);
        };
        
        console.log('尝试加载预览图：', resumeTemplates[templateKey].preview);
        previewImg.src = resumeTemplates[templateKey].preview;
        previewContainer.appendChild(previewImg);
    } else {
        createDefaultPreview(previewContainer);
    }
}

function createDefaultPreview(container) {
    const defaultPreview = document.createElement('div');
    defaultPreview.className = 'default-preview';
    defaultPreview.innerHTML = `
        <div class="preview-icon">
            <div class="preview-lines"></div>
        </div>
        <p>预览不可用</p>
    `;
    container.appendChild(defaultPreview);
}

function createNewResume() {
    const templateKey = document.getElementById('template-select').value;
    applyTemplate(templateKey);
}

function applyTemplate(templateKey) {
    const newTemplate = resumeTemplates[templateKey].config;
    
    const resumes = JSON.parse(localStorage.getItem('resumes')) || [];
    let currentResume;
    if (currentResumeId) {
        currentResume = resumes.find(r => r.id === currentResumeId);
        // 保留用户已编辑的内容
        for (let key in newTemplate) {
            if (!currentResume[key]) {
                currentResume[key] = newTemplate[key];
            }
        }
        currentResume.template = templateKey; // 更新模板标识
    } else {
        currentResume = JSON.parse(JSON.stringify(newTemplate));
        currentResume.id = Date.now();
        currentResume.template = templateKey;
        resumes.push(currentResume);
    }
    
    localStorage.setItem('resumes', JSON.stringify(resumes));
    
    currentResumeId = currentResume.id;
    
    const templateSelector = document.getElementById('template-selector');
    const resumeEditor = document.getElementById('resume-editor');
    
    templateSelector.classList.remove('visible');
    templateSelector.classList.add('fade-out');
    setTimeout(() => {
        templateSelector.style.display = 'none';
        resumeEditor.style.display = 'block';
        resumeEditor.classList.add('fade-in');
        
        // 加载对应的 CSS 样式
        loadTemplateStyle(templateKey);
        
        // 填充简历内容
        fillResumeContent(currentResume);
        
        setTimeout(() => {
            resumeEditor.classList.add('visible');
        }, 50);
    }, 300);
}

function loadTemplateStyle(templateKey) {
    const linkId = 'template-style';
    let styleLink = document.getElementById(linkId);
    if (!styleLink) {
        styleLink = document.createElement('link');
        styleLink.id = linkId;
        styleLink.rel = 'stylesheet';
        document.head.appendChild(styleLink);
    }
    styleLink.href = `styles/${templateKey}.css`;
}

function loadResumeList() {
    const resumeList = document.getElementById('resume-list');
    resumeList.innerHTML = '';
    const resumes = JSON.parse(localStorage.getItem('resumes')) || [];
    resumes.forEach((resume, index) => {
        const resumeItem = document.createElement('div');
        resumeItem.className = 'resume-item';
        resumeItem.innerHTML = `
            <span>${resume.name} - ${resume.title}</span>
            <div>
                <button onclick="editResume(${index})">编辑</button>
                <button onclick="deleteResume(${index})">删除</button>
            </div>
        `;
        resumeList.appendChild(resumeItem);
    });
}

function editResume(index) {
    const resumes = JSON.parse(localStorage.getItem('resumes')) || [];
    currentResumeId = resumes[index].id;
    fillResumeContent(resumes[index]);
    document.getElementById('resume-manager').style.display = 'none';
    document.getElementById('resume-editor').style.display = 'block';
}

function deleteResume(index) {
    const resumes = JSON.parse(localStorage.getItem('resumes')) || [];
    resumes.splice(index, 1);
    localStorage.setItem('resumes', JSON.stringify(resumes));
    loadResumeList();
}

function fillResumeContent(resumeData) {
    const resumeContent = document.getElementById('resume-content');
    resumeContent.className = `resume-content ${resumeData.template || 'template1'}`;
    resumeContent.innerHTML = `
        <div class="resume-header">
            ${resumeData.avatar ? 
                `<div class="avatar-container">
                    <img src="${resumeData.avatar}" alt="头像" class="avatar">
                </div>` : ''
            }
            <div class="name-title">
                <h1 class="editable" id="name">${resumeData.name}</h1>
                <p class="editable" id="title">${resumeData.title}</p>
            </div>
        </div>
        <section class="section">
            <h2 class="section-title">联系方式</h2>
            <p class="info-item"><strong>电话：</strong><span class="editable" id="phone">${resumeData.phone}</span></p>
            <p class="info-item"><strong>邮箱：</strong><span class="editable" id="email">${resumeData.email}</span></p>
            <p class="info-item"><strong>地址：</strong><span class="editable" id="address">${resumeData.address}</span></p>
        </section>
        <section class="section">
            <h2 class="section-title">教育背景</h2>
            <p class="info-item"><strong>学校：</strong><span class="editable" id="school">${resumeData.school}</span></p>
            <p class="info-item"><strong>专业：</strong><span class="editable" id="major">${resumeData.major}</span></p>
            <p class="info-item"><strong>学位：</strong><span class="editable" id="degree">${resumeData.degree}</span></p>
            <p class="info-item"><strong>时间：</strong><span class="editable" id="edu-time">${resumeData['edu-time']}</span></p>
            <p class="info-item"><strong>GPA：</strong><span class="editable" id="gpa">${resumeData.gpa}</span></p>
            <p class="info-item"><strong>相关课程：</strong><span class="editable" id="courses">${resumeData.courses}</span></p>
        </section>
        <section class="section">
            <h2 class="section-title">专业技能</h2>
            <ul id="skills">
                ${resumeData.skills.map(skill => `<li class="editable">${skill}</li>`).join('')}
            </ul>
        </section>
        <section class="section">
            <h2 class="section-title">实习经历</h2>
            <p class="info-item"><strong>公司：</strong><span class="editable" id="company">${resumeData.company}</span></p>
            <p class="info-item"><strong>职位：</strong><span class="editable" id="position">${resumeData.position}</span></p>
            <p class="info-item"><strong>时间：</strong><span class="editable" id="intern-time">${resumeData['intern-time']}</span></p>
            <ul id="intern-responsibilities">
                ${resumeData['intern-responsibilities'].map(resp => `<li class="editable">${resp}</li>`).join('')}
            </ul>
        </section>
        <section class="section">
            <h2 class="section-title">项目经验</h2>
            <p class="info-item"><strong>项目名称：</strong><span class="editable" id="project-name">${resumeData['project-name']}</span></p>
            <p class="info-item"><strong>类型：</strong><span class="editable" id="project-type">${resumeData['project-type']}</span></p>
            <p class="info-item"><strong>时间：</strong><span class="editable" id="project-time">${resumeData['project-time']}</span></p>
            <ul id="project-details">
                ${resumeData['project-details'].map(detail => `<li class="editable">${detail}</li>`).join('')}
            </ul>
        </section>
        <section class="section">
            <h2 class="section-title">证书与奖项</h2>
            <ul id="awards">
                ${resumeData.awards.map(award => `<li class="editable">${award}</li>`).join('')}
            </ul>
        </section>
        <section class="section">
            <h2 class="section-title">个人特质</h2>
            <ul id="traits">
                ${resumeData.traits.map(trait => `<li class="editable">${trait}</li>`).join('')}
            </ul>
        </section>
    `;
    addEditableListeners();
    addAvatarUploadListener();
}

function addEditableListeners() {
    const editables = document.querySelectorAll('.editable');
    editables.forEach(el => {
        el.addEventListener('click', function() {
            const text = this.innerText;
            const input = document.createElement('input');
            input.value = text;
            this.innerText = '';
            this.appendChild(input);
            input.focus();
            input.addEventListener('blur', function() {
                this.parentNode.innerText = this.value;
            });
        });
    });
}

function addAvatarUploadListener() {
    const addAvatarBtn = document.getElementById('add-avatar-btn');
    addAvatarBtn.addEventListener('click', triggerAvatarUpload);
}

function triggerAvatarUpload() {
    document.getElementById('avatar-input').click();
}

function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const avatarDataUrl = e.target.result;
            updateAvatar(avatarDataUrl);
        };
        reader.readAsDataURL(file);
    }
}

function updateAvatar(avatarDataUrl) {
    const resumeHeader = document.querySelector('.resume-header');
    const avatarContainer = resumeHeader.querySelector('.avatar-container');
    
    if (avatarContainer) {
        avatarContainer.innerHTML = `<img src="${avatarDataUrl}" alt="头像" class="avatar">`;
    } else {
        const newAvatarContainer = document.createElement('div');
        newAvatarContainer.className = 'avatar-container';
        newAvatarContainer.innerHTML = `<img src="${avatarDataUrl}" alt="头像" class="avatar">`;
        resumeHeader.insertBefore(newAvatarContainer, resumeHeader.firstChild);
    }
    
    // 更新本地存储中的简历数据
    const resumes = JSON.parse(localStorage.getItem('resumes')) || [];
    const resumeIndex = resumes.findIndex(r => r.id === currentResumeId);
    if (resumeIndex !== -1) {
        resumes[resumeIndex].avatar = avatarDataUrl;
        localStorage.setItem('resumes', JSON.stringify(resumes));
    }
}

function saveCurrentResume() {
    const resumes = JSON.parse(localStorage.getItem('resumes')) || [];
    const resumeIndex = resumes.findIndex(r => r.id === currentResumeId);
    if (resumeIndex !== -1) {
        const updatedResume = { ...resumes[resumeIndex] };
        document.querySelectorAll('.editable').forEach(el => {
            updatedResume[el.id] = el.innerText;
        });
        // 保留头像数据
        updatedResume.avatar = resumes[resumeIndex].avatar;
        resumes[resumeIndex] = updatedResume;
        localStorage.setItem('resumes', JSON.stringify(resumes));
        alert('简历已保存');
    }
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const resumeContent = document.getElementById('resume-content');
    html2canvas(resumeContent, {scale: 2}).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('我的简历.pdf');
    });
}

function showResumeList() {
    document.getElementById('resume-manager').style.display = 'block';
    document.getElementById('resume-editor').style.display = 'none';
    document.getElementById('advanced-editor').style.display = 'none';
    loadResumeList();
}

function showAdvancedEditor() {
    const resumes = JSON.parse(localStorage.getItem('resumes')) || [];
    const currentResume = resumes.find(r => r.id === currentResumeId);
    document.getElementById('json-editor').value = JSON.stringify(currentResume, null, 2);
    document.getElementById('resume-editor').style.display = 'none';
    document.getElementById('advanced-editor').style.display = 'block';
}

function applyJsonChanges() {
    try {
        const updatedResume = JSON.parse(document.getElementById('json-editor').value);
        const resumes = JSON.parse(localStorage.getItem('resumes')) || [];
        const resumeIndex = resumes.findIndex(r => r.id === currentResumeId);
        if (resumeIndex !== -1) {
            resumes[resumeIndex] = updatedResume;
            localStorage.setItem('resumes', JSON.stringify(resumes));
            fillResumeContent(updatedResume);
            hideAdvancedEditor();
            alert('修改已应用');
        }
    } catch (error) {
        alert('JSON格式错误，请检查后重试');
    }
}

function hideAdvancedEditor() {
    document.getElementById('resume-editor').style.display = 'block';
    document.getElementById('advanced-editor').style.display = 'none';
}