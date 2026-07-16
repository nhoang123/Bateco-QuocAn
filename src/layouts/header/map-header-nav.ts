import type { IHeaderNavigation, IHeaderParentLinkItem } from '@/interfaces/header.interface'
import type { ILink } from '@/interfaces/link.interface'
import { decodeHtmlEntities } from '@/lib/decode-html-entities'

export type HeaderNavLink = {
  label: string
  href: string
  target?: string
}

export type HeaderMegaPanel = {
  eyebrow: string
  description: string
  linksTitle: string
  links: HeaderNavLink[]
}

export type HeaderNavItem = {
  id: string
  label: string
  href: string
  target?: string
  mega?: HeaderMegaPanel
}

function linkTarget(target?: string | null): string | undefined {
  const value = target?.trim()
  return value || undefined
}

function navId(url: string, index: number): string {
  const slug = url.replace(/^\/+|\/+$/g, '') || 'home'
  return `${slug}-${index}`
}

function isLink(value: unknown): value is ILink {
  return Boolean(value && typeof value === 'object' && 'title' in value && 'url' in value)
}

function mapChildLinks(link: IHeaderParentLinkItem[] | false | null | undefined): HeaderNavLink[] {
  if (!Array.isArray(link)) return []

  const links: HeaderNavLink[] = []

  for (const entry of link) {
    if (!isLink(entry?.item)) continue
    links.push({
      label: decodeHtmlEntities(entry.item.title),
      href: entry.item.url || '/',
      target: linkTarget(entry.item.target),
    })
  }

  return links
}

function mapNormalItem(link: ILink, index: number): HeaderNavItem {
  return {
    id: navId(link.url, index),
    label: decodeHtmlEntities(link.title),
    href: link.url || '/',
    target: linkTarget(link.target),
  }
}

function mapParentItem(
  linkTitle: ILink,
  parent: NonNullable<IHeaderNavigation['parent']>,
  index: number,
): HeaderNavItem {
  return {
    id: navId(linkTitle.url, index),
    label: decodeHtmlEntities(linkTitle.title),
    href: linkTitle.url || '/',
    target: linkTarget(linkTitle.target),
    mega: {
      eyebrow: decodeHtmlEntities(parent.desc?.title),
      description: decodeHtmlEntities(parent.desc?.desc),
      linksTitle: decodeHtmlEntities(linkTitle.title),
      links: mapChildLinks(parent.link),
    },
  }
}

/**
 * Maps CMS header navigations → UI nav items.
 * - `select: "parent"` => mega menu
 * - `select: "normal"` => plain link
 */
export function mapHeaderNavigations(
  navigations: IHeaderNavigation[] | null | undefined,
): HeaderNavItem[] {
  if (!Array.isArray(navigations)) return []

  const items: HeaderNavItem[] = []

  navigations.forEach((nav, index) => {
    if (nav.select === 'parent') {
      const parent = nav.parent
      const linkTitle = parent?.link_title

      if (isLink(linkTitle)) {
        items.push(mapParentItem(linkTitle, parent, index))
      }
      return
    }

    if (nav.select === 'normal' && isLink(nav.normal)) {
      items.push(mapNormalItem(nav.normal, index))
    }
  })

  return items
}
