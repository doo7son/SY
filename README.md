<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>싸이월드 미니홈피</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
        
        body {
            background-color: #a3a3a3;
            background-image: radial-gradient(#7a7a7a 1px, transparent 1px);
            background-size: 4px 4px;
            font-family: '돋움', Dotum, sans-serif;
            font-size: 12px;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        /* 가장 바깥쪽 배경 */
        .outer-box {
            background-color: #bdf0f9;
            border: 1px solid #73b3c2;
            border-radius: 10px;
            padding: 20px 30px 20px 20px;
            display: flex;
            position: relative;
        }

        /* 안쪽 흰색 테두리 구역 */
        .inner-box {
            background-color: #ffffff;
            border: 2px dashed #a3a3a3;
            border-radius: 10px;
            padding: 10px;
            display: flex;
            width: 750px;
            height: 480px;
        }

        /* 왼쪽 프로필 영역 */
        .profile-container {
            width: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-right: 1px dashed #e3e3e3;
            padding-right: 15px;
        }

        .visitor-count {
            font-size: 10px;
            text-align: center;
            margin-bottom: 10px;
            width: 100%;
        }
        .visitor-count .today { color: #ff0000; font-weight: bold; }

        .profile-card {
            border: 1px solid #c9c9c9;
            background-color: #f2f2f2;
            width: 100%;
            height: 250px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px;
        }

        .minimi {
            width: 120px;
            height: 120px;
            background-color: #e3e3e3;
            border: 1px dashed #999;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 11px;
            color: #777;
        }

        .profile-text {
            margin-top: 15px;
            padding: 0 10px;
            text-align: center;
            line-height: 1.5;
            color: #666;
        }

        .ilchon-select {
            width: 100%;
            padding: 3px;
            border: 1px solid #c9c9c9;
            font-size: 11px;
            color: #555;
            margin-top: auto;
        }

        /* 오른쪽 메인 콘텐츠 영역 */
        .main-container {
            flex: 1;
            padding-left: 15px;
            display: flex;
            flex-direction: column;
        }

        .home-title {
            font-size: 16px;
            font-weight: bold;
            color: #238296;
            margin-bottom: 10px;
            border-bottom: 2px solid #e3e3e3;
            padding-bottom: 5px;
        }

        .bgm-box {
            background-color: #f6f6f6;
            border: 1px solid #e3e3e3;
            padding: 5px 10px;
            font-size: 11px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        .bgm-title { color: #ff6600; font-weight: bold; }

        /* 컨텐츠 박스 및 탭 전환용 설정 */
        .content-box {
            flex: 1;
            border: 1px solid #c9c9c9;
            border-radius: 5px;
            padding: 15px;
            overflow-y: auto;
        }

        /* 기본적으로 모든 탭 컨텐츠는 숨김 */
        .tab-content {
            display: none;
        }

        /* active 클래스가 붙은 컨텐츠만 노출 */
        .tab-content.active {
            display: block;
        }

        .section-title {
            font-size: 12px;
            font-weight: bold;
            color: #ff6600;
            border-bottom: 1px solid #ff6600;
            padding-bottom: 3px;
            margin-bottom: 10px;
        }

        /* 방명록 입력 폼 */
        .comment-form {
            display: flex;
            gap: 5px;
            margin-bottom: 15px;
            background: #f9f9f9;
            padding: 8px;
            border: 1px solid #e3e3e3;
        }
        .comment-form input {
            border: 1px solid #c9c9c9;
            padding: 3px;
            font-size: 11px;
        }
        .comment-form input[type="text"] { flex: 1; }
        .comment-form button {
            background: #ff6600;
            color: white;
            border: none;
            padding: 3px 10px;
            font-size: 11px;
            cursor: pointer;
        }

        .comment-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .comment-item {
            padding: 5px 0;
            border-bottom: 1px dashed #e3e3e3;
            line-height: 1.4;
        }
        .comment-name { color: #238296; font-weight: bold; }

        /* 사진첩 스타일 */
        .photo-album {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        .photo-item {
            border: 1px solid #e3e3e3;
            padding: 5px;
            text-align: center;
            background: #fafafa;
        }
        .photo-placeholder {
            width: 100%;
            height: 100px;
            background: #ddd;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #777;
        }

        /* 오른쪽 주황색 탭 메뉴 */
        .menu-container {
            position: absolute;
            right: -40px;
            top: 50px;
            display: flex;
            flex-direction: column;
            gap: 3px;
        }

        .menu-item {
            background-color: #238296;
            color: white;
            border: 1px solid #1d6a7b;
            border-left: none;
            border-radius: 0 5px 5px 0;
            padding: 8px 10px;
            cursor: pointer;
            font-size: 11px;
            text-align: center;
            width: 35px;
            box-shadow: 2px 2px 3px rgba(0,0,0,0.1);
            transition: all 0.1s;
        }

        .menu-item.active {
            background-color: #ffffff;
            color: #333;
            border-right: 1px solid #fff;
            font-weight: bold;
            width: 40px;
            position: relative;
            z-index: 2;
        }
    </style>
</head>
<body>

    <div class="outer-box">
        <div class="inner-box">
            
            <div class="profile-container">
                <div class="visitor-count">
                    TODAY <span class="today">486</span> | TOTAL <span class="total">120531</span>
                </div>
                <div class="profile-card">
                    <div class="minimi">(｡♥‿♥｡)<br>미니미 자리</div>
                    <div class="profile-text">
                        지독한 외로움이란 늘 내 곁에 있는 것...★<br>
                        cyworld.com/memories
                    </div>
                </div>
                
                <select class="ilchon-select" onchange="alert(this.value + ' 미니홈피로 이동합니다 (기능 가상 구현)')">
                    <option value="">파도타기 원츄?</option>
                    <option value="코딩요정">코딩 요정 (일촌)</option>
                    <option value="AI친구">AI 친구 (일촌)</option>
                </select>
            </div>

            <div class="main-container">
                <div class="home-title">ぁ_ぁ.. LH 홈p1에 온 걸 환영Hぇ..☆</div>
                
                <div class="bgm-box">
                    <span>🎵 <span class="bgm-title">Y (Please Tell Me Why)</span> - 프리스타일</span>
                    <span style="color: #999; cursor:pointer;" onclick="alert('도토리 5개가 부족합니다.')">▶ PLAY</span>
                </div>

                <div class="content-box">
                    
                    <div id="content-home" class="tab-content active">
                        <div class="section-title">Updated News</div>
                        <p style="margin: 5px 0 15px 0; color: #555;">쥬크박스가 업데이트 되었습니다. (1초 전)</p>
                        
                        <div class="section-title">소개글</div>
                        <p style="line-height: 1.6; color:#666;">
                            2000년대 감성에 갇혀버린 개발자의 미니홈피입니다.<br>
                            방명록에 글 안 남기면 일촌 끊음.. 물정화 금지!! ❌
                        </p>
                    </div>

                    <div id="content-profile" class="tab-content">
                        <div class="section-title">Profile</div>
                        <p><b>이름:</b> 싸이월드 매니아</p>
                        <p><b>성별:</b> 남/여 불문 감성파</p>
                        <p><b>하고 싶은 말:</b> <br>ㄴH 눈물만큼.. LH 홈피도 OI뿐ㄱr요..?★</p>
                    </div>

                    <div id="content-photos" class="tab-content">
                        <div class="section-title">My Photos</div>
                        <div class="photo-album">
                            <div class="photo-item">
                                <div class="photo-placeholder">추억의 사진 1</div>
                                <p style="margin:5px 0 0 0;">한강에서.. 한 컷..</p>
                            </div>
                            <div class="photo-item">
                                <div class="photo-placeholder">추억의 사진 2</div>
                                <p style="margin:5px 0 0 0;">오늘의 패션 (ㄴH가 좀 멋짐)</p>
                            </div>
                        </div>
                    </div>

                    <div id="content-guestbook" class="tab-content">
                        <div class="section-title">Guestbook (방명록)</div>
                        
                        <div class="comment-form">
                            <input type="text" id="input-name" placeholder="이름" style="width: 50px;">
                            <input type="text" id="input-msg" placeholder="매너 한마디 남겨주세요..">
                            <button onclick="addComment()">등록</button>
                        </div>

                        <ul class="comment-list" id="comment-list-ul">
                            <li class="comment-item">
                                <span class="comment-name">코딩요정:</span> 퍼가요~♡ 퍼갈 땐 댓글 필수인 거 알지? ㅎㅎ
                            </li>
                            <li class="comment-item">
                                <span class="comment-name">감성장인:</span> ㄴH 미니홈피도 들려줘.. 기다릴ㄱH..
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

        </div>

        <div class="menu-container">
            <div class="menu-item active" data-target="content-home">홈</div>
            <div class="menu-item" data-target="content-profile">프로필</div>
            <div class="menu-item" data-target="content-photos">사진첩</div>
            <div class="menu-item" data-turn="content-guestbook" data-target="content-guestbook">방명록</div>
        </div>
    </div>

    <script>
        // 1. 탭 메뉴 전환 기능
        const menuItems = document.querySelectorAll('.menu-item');
        const tabContents = document.querySelectorAll('.tab-content');

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                // 기존 활성화된 메뉴 및 컨텐츠 해제
                document.querySelector('.menu-item.active').classList.remove('active');
                document.querySelector('.tab-content.active').classList.remove('active');

                // 클릭한 메뉴 활성화
                item.classList.add('active');
                
                // 연결된 컨텐츠 ID 가져와서 노출
                const targetId = item.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });

        // 2. 방명록 등록 기능
        function addComment() {
            const nameInput = document.getElementById('input-name');
            const msgInput = document.getElementById('input-msg');
            const commentList = document.getElementById('comment-list-ul');

            if (!nameInput.value.trim() || !msgInput.value.trim()) {
                alert('이름과 내용을 모두 입력해 주thㅔ요!');
                return;
            }

            // 새로운 리스트 아이템 생성
            const li = document.createElement('li');
            li.className = 'comment-item';
            li.innerHTML = `<span class="comment-name">${nameInput.value}:</span> ${msgInput.value}`;

            // 최상단에 추가
            commentList.insertBefore(li, commentList.firstChild);

            // 입력창 초기화
            nameInput.value = '';
            msgInput.value = '';
        }
    </script>
</body>
</html>
