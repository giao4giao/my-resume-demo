// 定义简历模板配置
const resumeTemplates = {
    default: {
        className: 'default',
        sections: ['header', 'contact', 'education', 'skills', 'experience', 'projects', 'awards', 'traits']
    },
    modern: {
        className: 'modern',
        sections: ['header', 'summary', 'skills', 'experience', 'education', 'projects', 'awards', 'traits', 'contact']
    },
    classic: {
        className: 'classic',
        sections: ['header', 'summary', 'experience', 'education', 'skills', 'awards', 'traits', 'contact']
    },
    creative: {
        className: 'creative',
        sections: ['header', 'summary', 'skills', 'experience', 'projects', 'education', 'awards', 'traits', 'contact']
    }
};

// 定义各部分的渲染函数
window.sectionRenderers = {
  header: (resumeData, className) => `
      <div class="resume-section resume-header ${className}">
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
  `,
  contact: (resumeData, className) => `
      <div class="resume-section contact ${className}">
          <h2 class="section-title">联系方式</h2>
          <ul class="contact-list">
              <li><i class="icon-phone"></i> <span class="editable" id="phone">${resumeData.phone}</span></li>
              <li><i class="icon-email"></i> <span class="editable" id="email">${resumeData.email}</span></li>
              <li><i class="icon-location"></i> <span class="editable" id="address">${resumeData.address}</span></li>
          </ul>
      </div>
  `,
  summary: (resumeData, className) => `
      <div class="resume-section summary ${className}">
          <h2 class="section-title">个人简介</h2>
          <p class="editable" id="summary">${resumeData.summary || '请添加个人简介'}</p>
      </div>
  `,
  education: (resumeData, className) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">教育背景</h2>
          <p class="info-item"><strong>学校：</strong><span class="editable" id="school">${resumeData.school}</span></p>
          <p class="info-item"><strong>专业：</strong><span class="editable" id="major">${resumeData.major}</span></p>
          <p class="info-item"><strong>学位：</strong><span class="editable" id="degree">${resumeData.degree}</span></p>
          <p class="info-item"><strong>时间：</strong><span class="editable" id="edu-time">${resumeData['edu-time']}</span></p>
          <p class="info-item"><strong>GPA：</strong><span class="editable" id="gpa">${resumeData.gpa}</span></p>
          <p class="info-item"><strong>相关课程：</strong><span class="editable" id="courses">${resumeData.courses}</span></p>
      </div>
  `,
  skills: (resumeData, className) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">专业技能</h2>
          <ul id="skills">
              ${(resumeData.skills || []).map(skill => `<li class="editable">${skill}</li>`).join('')}
          </ul>
      </div>
  `,
  experience: (resumeData, className) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">实习经历</h2>
          <p class="info-item"><strong>公司：</strong><span class="editable" id="company">${resumeData.company || ''}</span></p>
          <p class="info-item"><strong>职位：</strong><span class="editable" id="position">${resumeData.position || ''}</span></p>
          <p class="info-item"><strong>时间：</strong><span class="editable" id="intern-time">${resumeData['intern-time'] || ''}</span></p>
          <ul id="intern-responsibilities">
              ${(resumeData['intern-responsibilities'] || []).map(resp => `<li class="editable">${resp}</li>`).join('')}
          </ul>
      </div>
  `,
  projects: (resumeData, className) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">项目经验</h2>
          <p class="info-item"><strong>项目名称：</strong><span class="editable" id="project-name">${resumeData['project-name'] || ''}</span></p>
          <p class="info-item"><strong>类型：</strong><span class="editable" id="project-type">${resumeData['project-type'] || ''}</span></p>
          <p class="info-item"><strong>时间：</strong><span class="editable" id="project-time">${resumeData['project-time'] || ''}</span></p>
          <ul id="project-details">
              ${(resumeData['project-details'] || []).map(detail => `<li class="editable">${detail}</li>`).join('')}
          </ul>
      </div>
  `,
  awards: (resumeData, className) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">证书与奖项</h2>
          <ul id="awards">
              ${(resumeData.awards || []).map(award => `<li class="editable">${award}</li>`).join('')}
          </ul>
      </div>
  `,
  traits: (resumeData, className) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">个人特质</h2>
          <ul id="traits">
              ${(resumeData.traits || []).map(trait => `<li class="editable">${trait}</li>`).join('')}
          </ul>
      </div>
  `
};

// 导出配置
window.resumeTemplates = resumeTemplates;
window.sectionRenderers = sectionRenderers;