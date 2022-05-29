/*
 * @Descripttion:
 * @Author: pujianguo
 * @Date: 2022-04-24 17:15:04
 */
import { _get, _put } from './v2'

// twitter
export const getTwitterLink = () => _get('/arche/mgt/user/twitter-auth-link', null, false, false)
export const bindTwitter = body => _put('/arche/mgt/user/bind-twitter', body, false, false)
export const disconnectTwitter = id => _put('/arche/mgt/user/disconnect-twitter', { id: id }, false, false)

// discord
export const bindDiscord = body => _put('/arche/mgt/user/bind-discord', body, false, false)
export const disconnectDiscord = id => _put('/arche/mgt/user/disconnect-discord', { id: id }, false, false)

// telegram
export const bindTelegram = body => _put('/arche/mgt/user/bind-telegram', body, false, false)
