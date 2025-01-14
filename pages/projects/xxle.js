import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function HappyEliminate() {
  // 得分
  const [score, setScore] = useState(0)
  // 消消乐数据
  const [squareData, setSquareData] = useState([])
  // 开始的坐标位置
  const [startCoordinates, setStartCoordinates] = useState([0, 0])
  // 点击的方块位置
  const [clickSquare, setClickSquare] = useState([])
  const colors = [1, 2, 3, 4, 5, 6, 7]

  const fillSquare = (_squareData, _score) => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (_squareData[i][j] === '0') {
          _squareData[i][j] = colors[Math.floor(Math.random() * 7)]
        }
      }
    }
    setSquareData(_squareData)
    clear(_squareData, _score)
  }

  const clear = (_squareData, _score) => {
    const m = 10
    const n = 10
    let isValid = false
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const del = []
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          if (_squareData[i][j] === '0') {
            continue
          }
          let x0 = i
          let x1 = i
          let y0 = j
          let y1 = j
          while (x0 >= 0 && x0 > i - 3 && _squareData[x0][j] === _squareData[i][j]) {
            --x0
          }
          while (x1 < m && x1 < i + 3 && _squareData[x1][j] === _squareData[i][j]) {
            ++x1
          }
          while (y0 >= 0 && y0 > j - 3 && _squareData[i][y0] === _squareData[i][j]) {
            --y0
          }
          while (y1 < n && y1 < j + 3 && _squareData[i][y1] === _squareData[i][j]) {
            ++y1
          }
          if (x1 - x0 > 3 || y1 - y0 > 3) {
            del.push([i, j])
          }
        }
      }
      if (del.length === 0) {
        break
      }
      isValid = true
      _score += del.length
      for (const square of del) {
        _squareData[square[0]][square[1]] = '0'
      }
      for (let j = 0; j < n; ++j) {
        let t = m - 1
        for (let i = m - 1; i >= 0; --i) {
          if (_squareData[i][j] !== '0') {
            ;[_squareData[t][j], _squareData[i][j]] = [_squareData[i][j], _squareData[t][j]]
            t -= 1
          }
        }
      }
    }
    setScore(_score)
    if (isValid) {
      fillSquare(_squareData, _score)
    }
  }

  const init = () => {
    const _squareData = []
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (j === 0) {
          _squareData.push([colors[Math.floor(Math.random() * 7)]])
        } else {
          _squareData[i][j] = colors[Math.floor(Math.random() * 7)]
        }
      }
    }
    clear(_squareData, 10)
  }

  const dragStart = (e, row, col) => {
    setStartCoordinates([e.clientX, e.clientY])
    setClickSquare([row, col])
  }

  const dragEnd = (e) => {
    const endCoordinates = [e.clientX, e.clientY]
    const _squareData = squareData
    const x = endCoordinates[0] - startCoordinates[0]
    const y = endCoordinates[1] - startCoordinates[1]
    const row = clickSquare[0]
    const col = clickSquare[1]
    if (Math.abs(x) >= Math.abs(y)) {
      if (x < 0 && col > 0) {
        const a = _squareData[row][col]
        _squareData[row][col] = _squareData[row][col - 1]
        _squareData[row][col - 1] = a
      } else if (x > 0 && col < 9) {
        const a = _squareData[row][col]
        _squareData[row][col] = _squareData[row][col + 1]
        _squareData[row][col + 1] = a
      }
    } else {
      if (y > 0 && row < 9) {
        ;[_squareData[row][col], _squareData[row + 1][col]] = [
          _squareData[row + 1][col],
          _squareData[row][col],
        ]
      } else if (y < 0 && row > 0) {
        ;[_squareData[row][col], _squareData[row - 1][col]] = [
          _squareData[row - 1][col],
          _squareData[row][col],
        ]
      }
    }
    clear(_squareData, score - 1)
    if (score <= 0) {
      if (confirm('分数用光了哦~~')) {
        init()
      } else {
        init()
      }
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <PageSEO title={`开心消消乐 - ${siteMetadata.author}`} description="闲暇时期写的小游戏" />
      <div>
        <div className="text-center text-3xl font-bold">开心消消乐</div>
        <div className="mb-5 mt-4 text-center">
          <span className="pr-10">得分：{score}分</span>
          <button onClick={init}>点击以重新开始</button>
        </div>
        {squareData.map((square, i) => {
          return (
            <div key={i} className="ml-auto mr-auto flex w-fit">
              {square.map((item, j) => {
                return (
                  <div
                    className={classNames(
                      'm-0.5',
                      'h-10',
                      'w-10',
                      'cursor-pointer',
                      'rounded',
                      'active:animate-jitter',
                      {
                        'bg-[#8D98CA]': item === 1,
                        'bg-[#A9A2F6]': item === 2,
                        'bg-[#56CAD9]': item === 3,
                        'bg-[#CDBEB0]': item === 4,
                        'bg-[#D2E08E]': item === 5,
                        'bg-[#8EE0A7]': item === 6,
                        'bg-[#8EB4E0]': item === 7,
                      }
                    )}
                    key={`${item}-${j}`}
                    onMouseUp={dragEnd}
                    onMouseDown={(e) => dragStart(e, i, j)}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}
