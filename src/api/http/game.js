import { _get, _post } from './request'
import { _post as _postV2 } from './v2'
import useLocalStore from '@/store/local'
import { _get as _mockGet } from '@/mock'

// template manage
export const listMyGame = query => _mockGet('/games', query)

// get all my games
export const listMyGameAll = (userId) => {
  return _get('/insight-watcher/game', { userId: userId }, true)
}
// get my games by pages
export const listMyGame1 = (query) => {
  query.first = query.limit
  query.skip = query.offset
  delete query.limit
  delete query.offset
  return _get('/insight-watcher/game', query, true)
}

// get game detail
export const getGame = id => {
  const localStore = useLocalStore()
  const userAddress = localStore.userAddress || null
  const body = { id: id, userId: userAddress }
  return _postV2('/arche/mgt/game/detail', body)
}

// get games by pages
export const listGame = (query) => {
  const localStore = useLocalStore()
  if (query.limit) {
    query.first = query.limit
    query.skip = query.offset
    delete query.limit
    delete query.offset
  }
  if (localStore.userAddress) {
    query.collectUserId = localStore.userAddress
  }
  return _get('/insight-watcher/game', query, true)
}

export const collectGame = (id, type) => {
  const localStore = useLocalStore()
  const body = {
    userId: localStore.userAddress,
    gameId: id,
    type: type,
  }
  return _post('/insight-watcher/game-collect', body)
}

export const getGameListItem = (data) => {
  let guilds = data.guild.map(x => x.logo)
  guilds = guilds.length > 0 ? guilds : ['/images/icon/empty_guild_logo.png']
  return {
    id: data.id,
    name: data.name,
    collected: data.collected,
    // img: data.logoBig,
    img: data.cover,
    devStatus: data.devStatus,
    tags: data.tags.map(x => x.name).splice(0, 3),
    chains: data.chain.map(x => x.logo),
    category: data.category[0]?.name || '',
    platform: data.platform.map(x => x.logo),
    flag: '',
    guilds: guilds,
  }
}
