// 英文默认简历数据
const defaultResumeData_en = {
  "mechanical": {
      "avatar": null,
      "name": "John Doe",
      "title": "Mechanical Engineering Graduate",
      "phone": "123-456-7890",
      "email": "johndoe@email.com",
      "address": "New York, NY",
      "school": "Massachusetts Institute of Technology",
      "major": "Mechanical Engineering",
      "degree": "Bachelor's Degree",
      "edu-time": "September 2018 - June 2022",
      "gpa": "3.8/4.0",
      "courses": "Mechanical Design, CNC Technology, Automation Control Systems, Engineering Materials",
      "skills": [
          "CAD/CAM Software: SolidWorks, AutoCAD, CATIA",
          "Programming Languages: C++, Python",
          "CNC Machine Operation and Programming",
          "Mechanical Design and Analysis",
          "Automation System Integration",
          "Proficient in Microsoft Office Suite"
      ],
      "company": "ABC Manufacturing Co.",
      "position": "Intern",
      "intern-time": "July 2021 - September 2021",
      "intern-responsibilities": [
          "Participated in designing and optimizing production line automation systems, improving efficiency by 15%",
          "Used SolidWorks for 3D modeling, assisting in new product designs",
          "Wrote CNC programs and operated CNC machines to manufacture parts"
      ],
      "project-name": "Smart Warehouse Robot Design",
      "project-type": "Team Project",
      "project-time": "March 2022 - June 2022",
      "project-details": [
          "Designed and manufactured an autonomous mobile robot for warehouse management",
          "Responsible for mechanical structure design and motion control system development",
          "Project won second prize in the university innovation design competition"
      ],
      "awards": [
          "Mechanical Design Engineer Certification (2022)",
          "Third Prize, National College Mechanical Innovation Design Competition (2021)",
          "CET-6 English Certificate"
      ],
      "traits": [
          "Strong desire to learn and innovate",
          "Excellent teamwork skills",
          "Good communication and problem-solving abilities",
          "Detail-oriented and responsible"
      ]
  },
  "software": {
      "avatar": null,
      "name": "John Smith",
      "title": "Software Engineer",
      "phone": "123-456-7890",
      "email": "johnsmith@email.com",
      "address": "New York, NY",
      "school": "Massachusetts Institute of Technology",
      "major": "Computer Science and Technology",
      "degree": "Master's Degree",
      "edu-time": "September 2019 - June 2022",
      "gpa": "3.9/4.0",
      "courses": "Data Structures and Algorithms, Operating Systems, Computer Networks, Software Engineering",
      "skills": [
          "Programming Languages: Java, Python, JavaScript, C++",
          "Web Development: React, Vue.js, Node.js",
          "Databases: MySQL, MongoDB, Redis",
          "Tools: Git, Docker, Jenkins",
          "Cloud Platforms: AWS, Azure"
      ],
      "company": "XYZ Tech Co.",
      "position": "Software Development Intern",
      "intern-time": "July 2021 - December 2021",
      "intern-responsibilities": [
          "Participated in developing the backend API for the company's core product",
          "Developed frontend user interfaces using React and Vue.js",
          "Wrote unit tests to improve code quality and maintainability"
      ],
      "project-name": "Distributed Microservices Architecture E-commerce Platform",
      "project-type": "Graduation Project",
      "project-time": "January 2022 - May 2022",
      "project-details": [
          "Designed and implemented an e-commerce platform based on microservices architecture",
          "Built backend services using Spring Cloud and developed frontend interfaces with React",
          "Implemented high-concurrency order processing and real-time inventory management"
      ],
      "awards": [
          "First Prize, ACM Programming Contest (2021)",
          "Third Prize, Alibaba Global Mathematics Competition (2020)",
          "Graduate Academic Scholarship"
      ],
      "traits": [
          "Strong learning enthusiasm for new technologies",
          "Skilled at analyzing and solving complex problems",
          "Good coding style and documentation skills",
          "Proactive and able to adapt quickly to new environments"
      ]
  },
  "marketing": {
      "avatar": null,
      "name": "Jane Doe",
      "title": "Marketing Specialist",
      "phone": "123-456-7890",
      "email": "janedoe@email.com",
      "address": "New York, NY",
      "school": "Massachusetts Institute of Technology",
      "major": "Marketing",
      "degree": "Bachelor's Degree",
      "edu-time": "September 2017 - June 2021",
      "gpa": "3.7/4.0",
      "courses": "Market Research, Consumer Behavior, Advertising, Brand Management",
      "skills": [
          "Digital marketing strategy development and execution",
          "Social media marketing",
          "Data analysis: Google Analytics, Excel",
          "Content creation and management",
          "Project management tools: Trello, Asana"
      ],
      "company": "ABC Advertising Co.",
      "position": "Marketing Assistant",
      "intern-time": "July 2020 - September 2020",
      "intern-responsibilities": [
          "Assisted in developing and executing social media marketing strategies",
          "Wrote and edited marketing copy and promotional materials",
          "Collected and analyzed market data to support decision-making"
      ],
      "project-name": "Online Promotion Campaign for New Brand",
      "project-type": "Team Project",
      "project-time": "March 2021 - May 2021",
      "project-details": [
          "Planned and executed online promotion campaign for new brand",
          "Managed social media accounts to increase brand awareness",
          "Optimized marketing strategies through data analysis to achieve 20% increase in sales"
      ],
      "awards": [
          "Excellent Award, National College Student Market Research and Analysis Competition (2020)",
          "Outstanding Student Leader",
          "CET-6 English Certificate"
      ],
      "traits": [
          "Innovative thinking, able to come up with unique marketing ideas",
          "Excellent communication and presentation skills",
          "Data-driven, able to use data to guide decisions",
          "Strong teamwork spirit, able to effectively manage projects"
      ]
  },
  "electrical": {
      "avatar": null,
      "name": "John Smith",
      "title": "Electrical Engineer",
      "phone": "123-456-7890",
      "email": "johnsmith@email.com",
      "address": "New York, NY",
      "school": "Massachusetts Institute of Technology",
      "major": "Electrical Engineering and Automation",
      "degree": "Master's Degree",
      "edu-time": "September 2018 - June 2021",
      "gpa": "3.8/4.0",
      "courses": "Power System Analysis, Electrical Machines, Automatic Control Theory, Power Electronics",
      "skills": [
          "Power system design and analysis",
          "PLC programming",
          "AutoCAD electrical drafting",
          "MATLAB/Simulink simulation",
          "Electrical equipment fault diagnosis"
      ],
      "company": "State Grid Co.",
      "position": "Electrical Engineering Intern",
      "intern-time": "July 2020 - September 2020",
      "intern-responsibilities": [
          "Participated in maintenance and repair of substation equipment",
          "Assisted in power system simulation analysis",
          "Participated in research and development of smart grid projects"
      ],
      "project-name": "Intelligent Distribution Automation System Design",
      "project-type": "Graduate Thesis",
      "project-time": "September 2020 - May 2021",
      "project-details": [
          "Designed and implemented an intelligent distribution automation system based on IoT technology",
          "Developed fault location and isolation algorithms",
          "The system successfully ran in the lab environment, improving the reliability of the distribution network"
      ],
      "awards": [
          "Second Prize, National College Student Electronic Design Competition (2021)",
          "Outstanding Graduation Thesis",
          "Graduate Academic Scholarship"
      ],
      "traits": [
          "Deep understanding and interest in power systems",
          "Good teamwork skills and communication abilities",
          "Able to learn and adapt to new technologies quickly",
          "Innovative thinking, able to solve complex problems"
      ]
  },
  "finance": {
      "avatar": null,
      "name": "Jane Doe",
      "title": "Financial Analyst",
      "phone": "123-456-7890",
      "email": "janedoe@email.com",
      "address": "New York, NY",
      "school": "Massachusetts Institute of Technology",
      "major": "Finance",
      "degree": "Bachelor's Degree",
      "edu-time": "September 2017 - June 2021",
      "gpa": "3.9/4.0",
      "courses": "Corporate Finance, Investment, Financial Derivatives, Financial Statement Analysis",
      "skills": [
          "Financial modeling and valuation",
          "Data analysis (Excel, Python)",
          "Bloomberg terminal operation",
          "Risk management",
          "Financial statement analysis"
      ],
      "company": "CITIC Securities",
      "position": "Investment Banking Intern",
      "intern-time": "July 2020 - September 2020",
      "intern-responsibilities": [
          "Assisted in financial analysis and valuation of listed companies",
          "Participated in due diligence for IPO and M&A projects",
          "Wrote industry research reports and financial models"
      ],
      "project-name": "M&A Case Analysis in New Energy Industry",
      "project-type": "Graduation Thesis",
      "project-time": "March 2021 - June 2021",
      "project-details": [
          "Analyzed major M&A cases in the new energy industry over the past 5 years",
          "Built a multi-factor regression model for M&A premiums",
          "Research results provided reference for industry M&A pricing strategies"
      ],
      "awards": [
          "CFA Level 1 Certificate",
          "Outstanding Student",
          "Third Prize, National College Financial Modeling Competition"
      ],
      "traits": [
          "Strong interest in financial markets and sharp insights",
          "Excellent data analysis skills and logical thinking",
          "Good written and oral communication skills",
          "Able to stay calm and efficient under pressure"
      ]
  }
};

// 导出英文默认简历数据
window.defaultResumeData_en = defaultResumeData_en;