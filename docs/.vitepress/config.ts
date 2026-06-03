import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI 学习笔记',
  description: 'AI 应用学习知识分享 - 和 Hermes Agent 一起探索 AI',
  
  lang: 'zh-CN',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '入门指南', link: '/guide/' },
      { text: 'AI 应用实战', link: '/ai-apps/' },
      { text: '学习日记', link: '/daily/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '入门指南',
          items: [
            { text: '开始使用', link: '/guide/' },
            { text: '环境搭建', link: '/guide/setup' },
            { text: '基础概念', link: '/guide/concepts' },
          ]
        }
      ],
      '/ai-apps/': [
        {
          text: 'AI 应用实战',
          items: [
            { text: '概览', link: '/ai-apps/' },
            { text: 'SearXNG 搜索引擎', link: '/ai-apps/searxng' },
            { text: 'Dify 工作流', link: '/ai-apps/dify' },
            { text: 'LLM 本地部署', link: '/ai-apps/llm-local' },
          ]
        },
        {
          text: 'MCP 协议',
          items: [
            { text: 'MCP 协议入门', link: '/ai-apps/mcp-intro' },
            { text: 'MCP Server 实战', link: '/ai-apps/mcp-server' },
          ]
        },
        {
          text: 'Hermes Agent',
          items: [
            { text: 'Hermes Agent 入门', link: '/ai-apps/hermes-intro' },
            { text: 'Hermes 自动化实战', link: '/ai-apps/hermes-auto' },
          ]
        }
      ],
      '/daily/': [
        {
          text: '学习日记',
          items: [
            { text: '概览', link: '/daily/' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/healthyang' }
    ],

    footer: {
      message: 'AI 应用学习知识分享',
      copyright: '© 2026 healthyang'
    },

    search: {
      provider: 'local'
    },

    outline: {
      label: '页面导航'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  }
})
