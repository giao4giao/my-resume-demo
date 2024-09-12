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
    },
    minimalist: {
        className: 'minimalist',
        sections: ['header', 'summary', 'experience', 'education', 'skills', 'contact']
    },
    professional: {
        className: 'professional',
        sections: ['header', 'summary', 'experience', 'skills', 'education', 'projects', 'awards', 'contact']
    },
    elegant: {
        className: 'elegant',
        sections: ['header', 'summary', 'experience', 'skills', 'education', 'awards', 'contact']
    }
};

// 定义各部分的渲染函数
window.sectionRenderers = {
  header: (resumeData, className) => `
      <div class="resume-section resume-header ${className}">
          <div class="avatar-container">
              ${resumeData.avatar ? 
                  `<img src="${resumeData.avatar}" alt="头像" class="avatar">` : 
                  ''
              }
          </div>
          <div class="name-title">
              <h1 class="editable" id="name">${resumeData.name}</h1>
              <p class="editable" id="title">${resumeData.title}</p>
          </div>
      </div>
  `,
  contact: (resumeData, className, translations) => `
      <div class="resume-section contact ${className}">
          <h2 class="section-title" data-translation-key="contact">${translations ? translations.contact : 'Contact'}</h2>
          <ul class="contact-list">
              <li><i class="icon-phone"></i> <span class="editable" id="phone">${resumeData.phone}</span></li>
              <li><i class="icon-email"></i> <span class="editable" id="email">${resumeData.email}</span></li>
              <li><i class="icon-location"></i> <span class="editable" id="address">${resumeData.address}</span></li>
          </ul>
      </div>
  `,
  summary: (resumeData, className, translations) => `
      <div class="resume-section summary ${className}">
          <h2 class="section-title">${translations.summary}</h2>
          <p class="editable" id="summary">${resumeData.summary || translations.addSummary}</p>
      </div>
  `,
  education: (resumeData, className, translations) => `
      <div class="resume-section ${className}">
          <h2 class="section-title" data-translation-key="education">${translations.education}</h2>
          <p class="info-item"><strong>${translations.school}：</strong><span class="editable" id="school">${resumeData.school}</span></p>
          <p class="info-item"><strong>${translations.major}：</strong><span class="editable" id="major">${resumeData.major}</span></p>
          <p class="info-item"><strong>${translations.degree}：</strong><span class="editable" id="degree">${resumeData.degree}</span></p>
          <p class="info-item"><strong>${translations.eduTime}：</strong><span class="editable" id="edu-time">${resumeData['edu-time']}</span></p>
          <p class="info-item"><strong>${translations.gpa}：</strong><span class="editable" id="gpa">${resumeData.gpa}</span></p>
          <p class="info-item"><strong>${translations.courses}：</strong><span class="editable" id="courses">${resumeData.courses}</span></p>
      </div>
  `,
  skills: (resumeData, className, translations) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">${translations.skills}</h2>
          <ul id="skills">
              ${Array.isArray(resumeData.skills) 
                  ? resumeData.skills.map(skill => `<li class="editable">${skill}</li>`).join('')
                  : typeof resumeData.skills === 'string'
                      ? `<li class="editable">${resumeData.skills}</li>`
                      : ''}
          </ul>
      </div>
  `,
  experience: (resumeData, className, translations) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">${translations.experience}</h2>
          <p class="info-item"><strong>${translations.company}：</strong><span class="editable" id="company">${resumeData.company || ''}</span></p>
          <p class="info-item"><strong>${translations.position}：</strong><span class="editable" id="position">${resumeData.position || ''}</span></p>
          <p class="info-item"><strong>${translations.internTime}：</strong><span class="editable" id="intern-time">${resumeData['intern-time'] || ''}</span></p>
          <ul id="intern-responsibilities">
              ${Array.isArray(resumeData['intern-responsibilities']) 
                  ? resumeData['intern-responsibilities'].map(resp => `<li class="editable">${resp}</li>`).join('')
                  : typeof resumeData['intern-responsibilities'] === 'string'
                      ? `<li class="editable">${resumeData['intern-responsibilities']}</li>`
                      : ''}
          </ul>
      </div>
  `,
  projects: (resumeData, className, translations) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">${translations.projects}</h2>
          <p class="info-item"><strong>${translations.projectName}：</strong><span class="editable" id="project-name">${resumeData['project-name'] || ''}</span></p>
          <p class="info-item"><strong>${translations.projectType}：</strong><span class="editable" id="project-type">${resumeData['project-type'] || ''}</span></p>
          <p class="info-item"><strong>${translations.projectTime}：</strong><span class="editable" id="project-time">${resumeData['project-time'] || ''}</span></p>
          <ul id="project-details">
              ${Array.isArray(resumeData['project-details']) 
                  ? resumeData['project-details'].map(detail => `<li class="editable">${detail}</li>`).join('')
                  : typeof resumeData['project-details'] === 'string'
                      ? `<li class="editable">${resumeData['project-details']}</li>`
                      : ''}
          </ul>
      </div>
  `,
  awards: (resumeData, className, translations) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">${translations.awards}</h2>
          <ul id="awards">
              ${Array.isArray(resumeData.awards) 
                  ? resumeData.awards.map(award => `<li class="editable">${award}</li>`).join('')
                  : typeof resumeData.awards === 'string'
                      ? `<li class="editable">${resumeData.awards}</li>`
                      : ''}
          </ul>
      </div>
  `,
  traits: (resumeData, className, translations) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">${translations.traits}</h2>
          <ul id="traits">
              ${Array.isArray(resumeData.traits) 
                  ? resumeData.traits.map(trait => `<li class="editable">${trait}</li>`).join('')
                  : typeof resumeData.traits === 'string'
                      ? `<li class="editable">${resumeData.traits}</li>`
                      : ''}
          </ul>
      </div>
  `
};

// 导出配置
window.resumeTemplates = resumeTemplates;
window.sectionRenderers = sectionRenderers;