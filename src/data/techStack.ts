// ─────────────────────────────────────────────────────────────────────────────
//  Tech Stack Data  ·  src/data/techStack.ts
//  Flat array — no categories. Edit this to update the Skills section.
//  Icon strings are Iconify IDs. Browse: https://icon-sets.iconify.design/
// ─────────────────────────────────────────────────────────────────────────────

export interface Skill {
  name: string
  icon: string  // Iconify icon ID
}

export const skills: Skill[] = [
  // Languages
  { name: 'Python',      icon: 'logos:python'            },
  { name: 'Java',        icon: 'logos:java'              },
  { name: 'JavaScript',  icon: 'logos:javascript'        },
  { name: 'TypeScript',  icon: 'logos:typescript-icon'   },
  { name: 'SQL',         icon: 'logos:mysql-icon'        },
  { name: 'HTML',        icon: 'logos:html-5'            },
  { name: 'CSS',         icon: 'logos:css-3'             },
  { name: 'C',           icon: 'logos:c'                 },
  { name: 'C++',         icon: 'logos:c-plusplus'        },
  { name: 'R',           icon: 'logos:r-lang'            },
  // Frameworks
  { name: 'React',       icon: 'logos:react'             },
  { name: 'Django',      icon: 'logos:django-icon'       },
  { name: 'Next.js',     icon: 'logos:nextjs-icon'       },
  { name: 'Node.js',     icon: 'logos:nodejs-icon'       },
  { name: 'Spring Boot', icon: 'logos:spring-icon'       },
  { name: 'FastAPI',     icon: 'logos:fastapi-icon'      },
  { name: 'Flask',       icon: 'logos:flask'             },
  { name: 'Express.js',  icon: 'skill-icons:expressjs-light' },
  { name: 'Bootstrap',   icon: 'logos:bootstrap'         },
  { name: 'JUnit',       icon: 'logos:junit5'            },
  // Developer Tools
  { name: 'Git',         icon: 'logos:git-icon'          },
  { name: 'GitHub',      icon: 'logos:github-icon'       },
  { name: 'VS Code',     icon: 'logos:visual-studio-code'},
  { name: 'Linux',       icon: 'logos:linux-tux'         },
  { name: 'Docker',      icon: 'logos:docker-icon'       },
  { name: 'PostgreSQL',  icon: 'logos:postgresql'        },
  { name: 'Supabase',    icon: 'logos:supabase-icon'     },
  { name: 'Eclipse IDE', icon: 'logos:eclipse-icon'      },
  { name: 'Excel',       icon: 'vscode-icons:file-type-excel' },
]
