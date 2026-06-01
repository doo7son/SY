<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>간단한 슈팅 게임</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #222;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: white;
            font-family: sans-serif;
            margin-top: 50px;
        }
        canvas {
            background-color: #000;
            border: 2px solid #fff;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        .instructions {
            margin-top: 15px;
            text-align: center;
        }
    </style>
</head>
<body>

    <h2>우주 슈팅 게임</h2>
    <canvas id="gameCanvas" width="400" height="500"></canvas>
    
    <div class="instructions">
        <p><strong>조작 방법:</strong> ⬅️ ➡️ 방향키 (이동) / [Space] (총알 발사)</p>
    </div>

    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        // 게임 상태 변수
        let isGameOver = false;
        let score = 0;

        // 플레이어 설정
        const player = {
            x: canvas.width / 2 - 15,
            y: canvas.height - 40,
            width: 30,
            height: 30,
            speed: 5,
            dx: 0
        };

        // 총알 및 적 배열
        let bullets = [];
        let enemies = [];

        // 키보드 입력 상태
        const keys = {
            ArrowRight: false,
            ArrowLeft: false,
            Space: false
        };

        // 키보드 이벤트 리스너
        document.addEventListener("keydown", (e) => {
            if (e.code === "ArrowRight") keys.ArrowRight = true;
            if (e.code === "ArrowLeft") keys.ArrowLeft = true;
            if (e.code === "Space") {
                // 스페이스바를 누를 때마다 총알 생성
                bullets.push({
                    x: player.x + player.width / 2 - 2.5,
                    y: player.y,
                    width: 5,
                    height: 10,
                    speed: 7
                });
            }
        });

        document.addEventListener("keyup", (e) => {
            if (e.code === "ArrowRight") keys.ArrowRight = false;
            if (e.code === "ArrowLeft") keys.ArrowLeft = false;
        });

        // 적 생성 함수
        function spawnEnemy() {
            const size = Math.random() * 20 + 20; // 20 ~ 40 크기
            const x = Math.random() * (canvas.width - size);
            enemies.push({
                x: x,
                y: -size,
                width: size,
                height: size,
                speed: Math.random() * 2 + 1 // 1 ~ 3 속도
            });
        }

        // 충돌 감지 함수 (AABB)
        function isColliding(rect1, rect2) {
            return (
                rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.y + rect1.height > rect2.y
            );
        }

        // 게임 업데이트 (로직 처리)
        function update() {
            if (isGameOver) return;

            // 플레이어 이동
            if (keys.ArrowRight && player.x + player.width < canvas.width) {
                player.x += player.speed;
            }
            if (keys.ArrowLeft && player.x > 0) {
                player.x -= player.speed;
            }

            // 총알 이동
            for (let i = 0; i < bullets.length; i++) {
                bullets[i].y -= bullets[i].speed;
                // 화면 밖으로 나간 총알 제거
                if (bullets[i].y < 0) {
                    bullets.splice(i, 1);
                    i--;
                }
            }

            // 적 이동
            for (let i = 0; i < enemies.length; i++) {
                enemies[i].y += enemies[i].speed;
                
                // 적이 화면 아래로 나가면 게임 오버
                if (enemies[i].y > canvas.height) {
                    isGameOver = true;
                }

                // 플레이어와 적 충돌 감지
                if (isColliding(player, enemies[i])) {
                    isGameOver = true;
                }
            }

            // 총알과 적 충돌 감지
            for (let i = 0; i < enemies.length; i++) {
                for (let j = 0; j < bullets.length; j++) {
                    if (isColliding(enemies[i], bullets[j])) {
                        enemies.splice(i, 1);
                        bullets.splice(j, 1);
                        score += 10;
                        i--; // 적 배열 인덱스 조정
                        break; // 하나의 총알로 하나의 적만 파괴
                    }
                }
            }
        }

        // 게임 그리기 (화면 렌더링)
        function draw() {
            // 화면 지우기
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 플레이어 그리기 (파란색 사각형)
            ctx.fillStyle = "#00f";
            ctx.fillRect(player.x, player.y, player.width, player.height);

            // 총알 그리기 (노란색)
            ctx.fillStyle = "#ff0";
            for (let bullet of bullets) {
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            }

            // 적 그리기 (빨간색)
            ctx.fillStyle = "#f00";
            for (let enemy of enemies) {
                ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            }

            // 점수 표시
            ctx.fillStyle = "#fff";
            ctx.font = "20px Arial";
            ctx.fillText(`Score: ${score}`, 10, 30);

            // 게임 오버 메시지
            if (isGameOver) {
                ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#fff";
                ctx.font = "40px Arial";
                ctx.textAlign = "center";
                ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
                ctx.font = "20px Arial";
                ctx.fillText("새로고침(F5)하여 다시 시작하세요", canvas.width / 2, canvas.height / 2 + 40);
            }
        }

        // 메인 게임 루프
        function gameLoop() {
            update();
            draw();
            if (!isGameOver) {
                requestAnimationFrame(gameLoop);
            }
        }

        // 1초(1000ms)마다 적 생성
        setInterval(spawnEnemy, 1000);

        // 게임 시작
        gameLoop();
    </script>
</body>
</html>
