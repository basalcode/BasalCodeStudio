/* asset */
// basics
import htmlLogo from 'asset/img/logo/html.svg';
import cssLogo from 'asset/img/logo/css.svg';
import javascriptLogo from 'asset/img/logo/javascript.svg';

// host
import awsLogo from 'asset/img/logo/aws.svg';
import awsRoute53Logo from 'asset/img/logo/aws-route53.svg';
import awsEC2Logo from 'asset/img/logo/aws-ec2.svg';
import ubuntuLogo from 'asset/img/logo/ubuntu.svg';
import httpsLogo from 'asset/img/logo/lets-encrypt.svg';

// front
import sassLogo from 'asset/img/logo/sass.svg';
import reactLogo from 'asset/img/logo/react.svg';
import reactRouterLogo from 'asset/img/logo/react-router.svg';
import reduxLogo from 'asset/img/logo/redux.svg';
import reduxSagaLogo from 'asset/img/logo/redux-saga.svg';

// back
import nodejsLogo from 'asset/img/logo/nodejs.svg';
import nginxLogo from 'asset/img/logo/nginx.svg';
import expressLogo from 'asset/img/logo/express.svg';
import pm2Logo from 'asset/img/logo/pm2.svg';
import mysqlLogo from 'asset/img/logo/mysql.svg';

// others
import npmLogo from 'asset/img/logo/npm.svg';
import gitLogo from 'asset/img/logo/git.svg';

const itemDatas = {
    Basics: {
        proficiency: 100,
        items: [
            { imagePath: htmlLogo,
                title: "HTML", 
                description: "웹 표준에 맞는, 시멘틱한 HTML 코드를 작성하기 위해 노력하고 고민합니다." },
            { imagePath: cssLogo,
                title: "CSS", 
                description: "CSS transition과 animation을 활용한 동적인 웹페이지 구성에 관심이 많습니다." },
            { imagePath: javascriptLogo,
                title: "Javascript", 
                description: "최신 Javascript 사용한 이벤트 처리, 서버와의 통신, 비동기 처리를 잘 다룹니다." }
        ]
    },
    Host: {
        proficiency: 95,
        items: [
            { imagePath: awsLogo, 
                title: "AWS", 
                description: "AWS를 사용해 해당 블로그를 개발하고 있습니다 :)" },
            { imagePath: awsEC2Logo, 
                title: "AWS EC2", 
                description: "AWS에서 서버를 할당받아 운영할 수 있습니다입니다." },
            { imagePath: awsRoute53Logo, 
                title: "AWS Route53", 
                description: "Amazon DNS 서버에 도메인을 등록해 서비스를 운영중입니다." },
            { imagePath: ubuntuLogo, 
                title: "Ubuntu", 
                description: "Ubuntu 운영체제를 사용해 서비스를 호스팅 하고 있습니다." },
            { imagePath: httpsLogo, 
                title: "Let's Encrypt", 
                description: "SSL이 적용된 HTTPS 프로토콜을 사용한 서비스를 운영중입니다." }
        ]
    },
    Frontend: {
        proficiency: 100,
        items: [
            { imagePath: sassLogo, 
                title: "SASS", 
                description: "SASS와 BEM 네이밍 컨벤션을 조합하여 CSS의 단점을 극복해나가고 있습니다." },
            { imagePath: reactLogo, 
                title: "React", 
                description: "견고한 Component의 설계에 관심을 가지고 React hook을 즐기는 중입니다." },
            { imagePath: reactRouterLogo, 
                title: "React Router", 
                description: "SPA의 구성을 위해 React Router를 도입해 사용하고 있습니다." },
            { imagePath: reduxLogo, 
                title: "Redux", 
                description: "App의 전역적인 상태관리는 Redux를 도입해 사용하고 있고, 더 나은 사용방법을 연구중입니다." },
            { imagePath: reduxSagaLogo, 
                title: "Redux Saga", 
                description: "비동기적인 상황을 처리하기 위한 Middleware로 Redux Saga를 도입해 사용합니다." }
        ]
    },
    Backend: {
        proficiency: 95,
        items: [
            { imagePath: nodejsLogo, 
                title: "Node.js", 
                description: "Server Application를 제작하는 도구로 Node.js를 채택하여 사용하고 있습니다." },
            { imagePath: nginxLogo, 
                title: "NGINX", 
                description: "Reserve proxy로 NGINX를 사용해 보안과 성능을 높여 서비를 운영 중입니다." },
            { imagePath: expressLogo, 
                title: "Express", 
                description: "Express Framework에 직접 설계한 REST API를 서비스에 적용해 보았습니다." },
            { imagePath: mysqlLogo, 
                title: "MySQL", 
                description: "MySQL을 사용해 Session과 Server 데이터를 저장하고, bcrypt를 이용해 hashing을 적용했습니다." },
            { imagePath: pm2Logo, 
                title: "PM2", 
                description: "Node.js 프로세스를 PM2를 사용해 관리하고 있습니다." }
        ]
    },
    Others: {
        proficiency: 100,
        items: [
            { imagePath: npmLogo, 
                title: "NPM", 
                description: "Package Manager를 사용해 다양한 필요한 Modeule들을 다룰 수 있습니다." },
            { imagePath: gitLogo, 
                title: "git", 
                description: "git을 사용해 버전관리를 하고 있으며, Github repository에 꾸준히 업로드 중입니다." },
        ]
    }
};

export default itemDatas;