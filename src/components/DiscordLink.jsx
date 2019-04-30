import React from 'react'

export function DiscordLink (props) {
  return (
    <a
      href='https://discord.gg/WXMDXqb'
      target='_blank'
      rel='noopener noreferrer'
      {...props}
    >
      {props.children}
    </a>
  )
}
