# MailedIt!

메일 작성을 완벽하게 해내다, [**_MailedIt!_**](https://mailedit.me/)
**_MailedIt_** 은 자체 제작 기본 템플릿과 자신만의 메일 템플릿 만들기로 실무 이메일을 보다 쉽게 작성할 수 있도록 돕는 서비스입니다.

<img width="1000" alt="스크린샷_2022-05-03_오후_3 38 50" src="https://user-images.githubusercontent.com/79887293/169654891-18be63bf-d001-4b8f-82f5-00f4adc1682e.png">

<br/>
<br/>

## 주요 기능 소개

### 1. 비로그인 유저

- 기본으로 제공하는 기본템플릿을 자유롭게 사용할 수 있습니다.
- 여러 템플릿을 불러와서 사용할 수 있으며, 기본적인 에디터 기능을 사용할 수 있습니다.
- 복사하기 기능을 통해 작성한 내용을 클립보드에 복사할 수 있습니다.

<img src="https://github.com/Team-MailedIt/mailedit-client/raw/master/public/img/help_img.png"/>

<br/>

### 2. 로그인 유저

- 자유롭게 템플릿을 작성하고 저장할 수 있습니다.
- 그룹을 추가하고 해당 그룹에 템플릿을 저장할 수 있습니다.
- 템플릿은 블럭으로 지정된 부분만 저장됩니다.

<br/>
<br/>

## 페이지 구성

### /home

#### [사이드바]

- **검색 기능** : 제목으로 전체 템플릿을 검색할 수 있습니다.
- **그룹 필터링 기능** : 그룹별로 템플릿을 모아볼 수 있습니다.

<img src="https://github.com/Team-MailedIt/mailedit-client/raw/master/gif/sidebar.gif">

#### [메인 페이지]

템플릿별로 **수정 시간**, **즐겨찾기 버튼**, **삭제 버튼**을 썸네일 형태로 구현하여 직관적이고, 수정과 접근이 용이합니다.

<img src="https://github.com/Team-MailedIt/mailedit-client/raw/master/gif/mainpage.gif">

#### [기본 템플릿 모달]

- **드롭다운 메뉴** : 드롭다운 형식으로 회사/학교 옵션을 선택할 수 있고, 해당 템플릿의 제목을 클릭하면 기본템플릿 모달이 열립니다.
- **기본 템플릿 모달** : 회사/학교 탭에서 각각의 템플릿을 확인할 수 있으며, 템플릿 사용하기 버튼을 클릭하면 에디터 페이지로 이동합니다.

<img src="https://github.com/Team-MailedIt/mailedit-client/raw/master/gif/mainmodal.gif">

<br/>

### /workspace

#### [사이드바]

- **검색 기능** : 제목으로 전체 템플릿을 검색할 수 있습니다.
- **그룹 기능** : 그룹별로 템플릿을 모아볼 수 있고, 각각의 템플릿을 불러올 수 있습니다.

<img src="https://github.com/Team-MailedIt/mailedit-client/raw/master/gif/ws_sidebar.gif">

#### [에디터]

- **shift + enter** 시 블럭 내에서 줄바꿈, **enter** 시 새로운 블럭을 생성합니다.
- 삭제는 기본적으로 **backspace**를 사용합니다.
- 원하는 영역만큼 드래그하여 블럭화할 수 있으며, 해당 블럭만 저장됩니다.
- 블럭 간 드래그&드랍으로 순서를 변경할 수 있습니다.
- 복사하기를 통해 작성한 내용을 클립보드에 복사할 수 있습니다.

<img src="https://github.com/Team-MailedIt/mailedit-client/raw/master/gif/editor.gif">

#### [그룹]

카테고리별로 그룹 이름과 색상을 지정할 수 있으며, 색과 그룹명은 1대1로 대응됩니다.

<img src="https://github.com/Team-MailedIt/mailedit-client/raw/master/gif/group.gif">

#### [도움말]

- **템플릿 만들기 도움말** : 메인 페이지에서 '템플릿 만들기' 버튼 위에 마우스를 hover하면 에디터 페이지로 이동한다는 안내 메세지를 띄웁니다.
- **기본 사용법 도움말** : 로그인하지 않은 사용자 또는 템플릿 개수가 3개 이하인 사용자에게 default로 popup되며, 기본적인 사용법에 대해 알 수 있습니다.
- **에디터 사용법 도움말** : 캐러셀 형태의 모달로 구현하였으며, 기본적인 에디터 사용법을 알 수 있습니다.

<img src="https://github.com/Team-MailedIt/mailedit-client/raw/master/gif/help.gif">
