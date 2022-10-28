import './style.css'
import {Coordinate, SessionEvent, UserSession, Venue} from './models'
import userSessions from './userSessions.json'
import venues from './venues.json'

const canvas = document.querySelector<HTMLDivElement>('#app')!.appendChild(document.createElement('canvas'))
canvas.width = 800
canvas.height = 600

const ctx = canvas.getContext('2d');

const maxX = Math.max(...venues.map(venue => venue.position.x))
const maxY = Math.max(...venues.map(venue => venue.position.y))

function scale (x, y) {
  return [(x*canvas.width)/(maxX + 50), (y*canvas.height)/(maxY + 50)]
}

function drawCircle (x, y) {
  ctx.fillStyle = "red"
  ctx.beginPath()
  ctx.arc(x, y, 5, 0, Math.PI * 2, true)
  ctx.fill()
}

function drawPath (path) {
  ctx.strokeStyle = "green"
  ctx.beginPath()
  ctx.moveTo(...path[0])
  path.forEach(point => ctx.lineTo(...point))
  ctx.stroke()
}

const paths = userSessions.map(user => user.path.map(point => scale(point.position.x, point.position.y)))

paths.forEach(path => drawPath(path))
venues.forEach(venue => {
  const scaled = scale(venue.position.x, venue.position.y)
  drawCircle(...scaled)
  ctx.font = '10px serif'
  ctx.fillStyle = "white"
  ctx.fillText(venue.name, scaled[0]+10, scaled[1])
})

