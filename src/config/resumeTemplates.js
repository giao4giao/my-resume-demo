// 定义简历模板配置
const resumeTemplates = {
    default: {
        className: 'default',
        sections: ['header', 'contact', 'education', 'skills', 'experience', 'projects', 'awards', 'traits', 'self-evaluation']
    },
    modern: {
        className: 'modern',
        sections: ['header', 'summary', 'skills', 'experience', 'education', 'projects', 'awards', 'traits', 'contact', 'self-evaluation']
    },
    classic: {
        className: 'classic',
        sections: ['header', 'summary', 'experience', 'education', 'skills', 'awards', 'traits', 'contact', 'self-evaluation']
    },
    creative: {
        className: 'creative',
        sections: ['header', 'summary', 'skills', 'experience', 'projects', 'education', 'awards', 'traits', 'contact', 'self-evaluation']
    },
    minimalist: {
        className: 'minimalist',
        sections: ['header', 'summary', 'experience', 'education', 'skills', 'contact', 'self-evaluation']
    },
    professional: {
        className: 'professional',
        sections: ['header', 'summary', 'experience', 'skills', 'education', 'projects', 'awards', 'contact', 'self-evaluation']
    },
    elegant: {
        className: 'elegant',
        sections: ['header', 'summary', 'experience', 'skills', 'education', 'awards', 'contact', 'self-evaluation']
    }
};

// 定义各部分的渲染函数
window.sectionRenderers = {
  header: (resumeData, className, translations) => `
      <div class="resume-section resume-header ${className}">
          <div class="avatar-container">
              ${resumeData.avatar ? 
                  `<img src="${resumeData.avatar}" alt="${translations.avatar}" class="avatar">` : 
                  ''
              }
          </div>
          <div class="name-title">
              <h1 class="editable" contenteditable="true" id="name">${resumeData.name || translations.addName}</h1>
              <p class="editable" contenteditable="true" id="title">${resumeData.title || translations.addTitle}</p>
          </div>
      </div>
  `,
  contact: (resumeData, className, translations) => `
      <div class="resume-section contact ${className}">
          <h2 class="section-title" data-translation-key="contact">${translations.contact}</h2>
          <ul class="contact-list">
              <li><i class="icon-phone"></i> <span class="editable" contenteditable="true" id="phone">${resumeData.phone || translations.addPhone}</span></li>
              <li><i class="icon-email"></i> <span class="editable" contenteditable="true" id="email">${resumeData.email || translations.addEmail}</span></li>
              <li><i class="icon-location"></i> <span class="editable" contenteditable="true" id="address">${resumeData.address || translations.addAddress}</span></li>
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
          <p class="info-item"><strong>${translations.school}：</strong><span class="editable" contenteditable="true" id="school">${resumeData.school || translations.addSchool}</span></p>
          <p class="info-item"><strong>${translations.major}：</strong><span class="editable" contenteditable="true" id="major">${resumeData.major || translations.addMajor}</span></p>
          <p class="info-item"><strong>${translations.degree}：</strong><span class="editable" contenteditable="true" id="degree">${resumeData.degree || translations.addDegree}</span></p>
          <p class="info-item"><strong>${translations.eduTime}：</strong><span class="editable" contenteditable="true" id="edu-time">${resumeData['edu-time'] || translations.addEduTime}</span></p>
          <p class="info-item"><strong>${translations.gpa}：</strong><span class="editable" contenteditable="true" id="gpa">${resumeData.gpa || translations.addGPA}</span></p>
          <p class="info-item"><strong>${translations.courses}：</strong><span class="editable" contenteditable="true" id="courses">${resumeData.courses || translations.addCourses}</span></p>
      </div>
  `,
  skills: (resumeData, className, translations) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">${translations.skills}</h2>
          <ul id="skills">
              ${Array.isArray(resumeData.skills) && resumeData.skills.length > 0
                  ? resumeData.skills.map(skill => `<li class="editable" contenteditable="true">${skill}</li>`).join('')
                  : `<li class="editable" contenteditable="true">${translations.addSkills}</li>`
              }
          </ul>
      </div>
  `,
  experience: (resumeData, className, translations) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">${translations.experience}</h2>
          <p class="info-item"><strong>${translations.company}：</strong><span class="editable" contenteditable="true" id="company">${resumeData.company || translations.addCompany}</span></p>
          <p class="info-item"><strong>${translations.position}：</strong><span class="editable" contenteditable="true" id="position">${resumeData.position || translations.addPosition}</span></p>
          <p class="info-item"><strong>${translations.internTime}：</strong><span class="editable" contenteditable="true" id="intern-time">${resumeData['intern-time'] || translations.addInternTime}</span></p>
          <ul id="intern-responsibilities">
              ${Array.isArray(resumeData['intern-responsibilities']) && resumeData['intern-responsibilities'].length > 0
                  ? resumeData['intern-responsibilities'].map(resp => `<li class="editable" contenteditable="true">${resp}</li>`).join('')
                  : `<li class="editable" contenteditable="true">${translations.addInternResponsibilities}</li>`
              }
          </ul>
      </div>
  `,
  projects: (resumeData, className, translations) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">${translations.projects}</h2>
          <p class="info-item"><strong>${translations.projectName}：</strong><span class="editable" contenteditable="true" id="project-name">${resumeData['project-name'] || translations.addProjectName}</span></p>
          <p class="info-item"><strong>${translations.projectType}：</strong><span class="editable" contenteditable="true" id="project-type">${resumeData['project-type'] || translations.addProjectType}</span></p>
          <p class="info-item"><strong>${translations.projectTime}：</strong><span class="editable" contenteditable="true" id="project-time">${resumeData['project-time'] || translations.addProjectTime}</span></p>
          <ul id="project-details">
              ${Array.isArray(resumeData['project-details']) && resumeData['project-details'].length > 0
                  ? resumeData['project-details'].map(detail => `<li class="editable" contenteditable="true">${detail}</li>`).join('')
                  : `<li class="editable" contenteditable="true">${translations.addProjectDetails}</li>`
              }
          </ul>
      </div>
  `,
  awards: (resumeData, className, translations) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">${translations.awards}</h2>
          <ul id="awards">
              ${Array.isArray(resumeData.awards) && resumeData.awards.length > 0
                  ? resumeData.awards.map(award => `<li class="editable" contenteditable="true">${award}</li>`).join('')
                  : `<li class="editable" contenteditable="true">${translations.addAwards}</li>`
              }
          </ul>
      </div>
  `,
  traits: (resumeData, className, translations) => `
      <div class="resume-section ${className}">
          <h2 class="section-title">${translations.traits}</h2>
          <ul id="traits">
              ${Array.isArray(resumeData.traits) && resumeData.traits.length > 0
                  ? resumeData.traits.map(trait => `<li class="editable" contenteditable="true">${trait}</li>`).join('')
                  : `<li class="editable" contenteditable="true">${translations.addTraits}</li>`
              }
          </ul>
      </div>
  `,
  'self-evaluation': (resumeData, className, translations) => `
      <div class="resume-section self-evaluation ${className}">
          <h2 class="section-title">${translations.selfEvaluation || '自我评价'}</h2>
          <div class="editable" id="self-evaluation" contenteditable="true" style="text-indent: 2em;">
              ${resumeData['self-evaluation'] || translations.addSelfEvaluation}
          </div>
      </div>
  `
};

// 导出配置
window.resumeTemplates = resumeTemplates;
window.sectionRenderers = sectionRenderers;