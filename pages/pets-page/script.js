body {
    width: 100vw;
    height: 100%;
    font-family: 'Arial', sans-serif;
    color: #C4C4C4;
    position: relative;
    overflow-x: hidden;
}

h2 {
    font-family: 'Georgia', serif;
    font-style: normal;
    font-weight: normal;
    font-size: 44px;
    line-height: 130%;
    white-space: pre-line;
}

h3 {
    font-family: Georgia;
    font-style: normal;
    font-weight: normal;
    font-size: 35px;
    line-height: 130%;
    letter-spacing: 0.06rem;
    color: #545454;
    white-space: pre-line;
}

h4,
.contacts a,
.location a {
    font-family: Georgia;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 115%;
    letter-spacing: 0.06em;
    color: #545454;
}

h5 {
    font-family: Georgia;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 110%;
    letter-spacing: 0.06em;
}

.paragraph-l,
.not-only_text,
.about_text {
    font-size: 15px;
    line-height: 160%;
    color: #4C4C4C;
}

.paragraph-s,
.in-addition_text {
    font-style: italic;
    font-weight: normal;
    font-size: 12px;
    line-height: 150%;
    color: #B2B2B2;
}

.button-primary {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    outline: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 207px;
    height: 52px;
    background: #F1CDB3;
    border-radius: 100px;
    font-family: Georgia;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 130%;
    letter-spacing: 0.06em;
    color: #292929;
    transition: 0.15s ease-in-out;
}

.button-primary:hover {
    background: #FDDCC4;
}

.button-secondary {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 207px;
    height: 52px;
    border: 2px solid #F1CDB3;
    border-radius: 100px;
    background: transparent;
    font-family: Georgia;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    transition: .15s ease-in-out;
}

.button-secondary:hover {
    background: #FDDCC4;
    border: 2px solid #FDDCC4;
}

a {
    font-family: Arial;
    font-size: 15px;
    line-height: 160%;
    color: #CDCDCD;
    text-decoration: none;
    transition: .15s ease-in-out;
    border-bottom: 3px solid transparent;
}

.link-active {
    color: #545454;
    border-bottom: 3px solid #F1CDB3;
}

.link-active:hover {
    border-bottom: 3px solid transparent;
}

a:hover {
    color: #FAFAFA;
    border-bottom: 3px solid #F1CDB3;
}

header,
section,
footer {
    width: 100%;
    display: flex;
    justify-content: center;    
    flex-wrap: wrap;
    position: relative;
}

header a {
    color: #545454;
}

header a:hover {
    color: #292929;
}

nav,
.our-friends_wrapper,
.footer_wrapper {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: clamp(800px, 100%, 1200px);
    position: relative;
}

header {
    width: 100%;
    height: min(60px, calc(30px + 100%));
    margin-top: 60px;
    grid-column: span 2;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav .menu-burger {
    display: none;
}

nav ul {
    display: flex;
    margin: 0;
    padding: 0;
}

nav ul li {
    list-style: none;
    padding-right: 35px;
}

nav ul li:last-of-type {
    padding-right: 0;
}

.logo_wrapper h1 a {
    font-family: Georgia;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 110%;
    letter-spacing: 0.06em;
    color: #545454;
}

.logo_subtitle {
    margin-top: 10px;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0.1em;
    color: #292929;
}


.our-friends {
    background: #F6F6F6;
    min-height: 877px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.our-friends_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cards_wrapper {
    width: 100%;
    min-height: 930px;
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: repeat(2, 50%);
}

.pagination {
    width: 100%;
    min-height: 1162px;
    margin: 60px 0;
    position: relative;
    display: flex;
    justify-content: center;
}

.card {
    width: 270px;
    height: 435px;
    justify-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background: #FAFAFA;
    border-radius: 9px;
    transition: all .15s ease-in-out;
}

.card:hover {
    background: #FFFFFF;
    box-shadow: 0px 2px 35px 14px rgba(13, 13, 13, 0.04);
}

.card_image {
    max-width: 90%;
    border-radius: 5px;
    height: 270px;
}

.pagination-controls {
    min-width: 300px;
    max-width: 340px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
}

.pagination-control,
.popup-close {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
    width: 52px;
    height: 52px;
    border: 2px solid #F1CDB3;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .15s ease-in-out;
    font-family: 'Georgia', serif;
}

.control-prev {
    left: 0;
    right: auto;
}

.control-next {
    right: 0;
    left: auto;
}

.control-curr {
    background: #FDDCC4;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}

.pagination-control:hover,
.popup-close:hover {
    background: #FDDCC4;
    border: 2px solid #FDDCC4;
}

.inactive,
.inactive:hover {
    border: 2px solid #CDCDCD;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    color:  #CDCDCD;
    background-color: transparent;
}

.popup-close {
    position: absolute;
    right: -42px;
    top: -52px;
}

.card-popup {
    width: 75%;
    z-index: 5;
    height: 80vh;
    background-color: #FAFAFA;
    box-shadow: 0px 2px 35px 14px rgba(13, 13, 13, 0.04);
    border-radius: 9px;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    color: #000000;
    font-family: 'Georgia', serif;
}

.card-popup .card-name {
    color: #000000;
    text-align: left;
}

.card-popup_img {
    align-self: center;
    justify-self: center;
}

.card-popup ul {
    margin: 0;
    margin-left: 10px;
    padding: 0;
}

.card-popup ul li {
    list-style: none;
    position: relative;
    font-weight: bold;
}

.card-popup ul li span {
    font-weight: normal;
}

.card-popup ul li:before {
    position: absolute;
    content: '';
    width: 4px;
    height: 4px;
    left: -10px;
    top: 11px;
    border-radius: 50%;
    background-color: #F1CDB3;
}

.card-popup_wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.our-friends h3 {
    text-align: center;
}

footer {
    background: radial-gradient(110.67% 538.64% at 5.73% 50%, #513D2F 0%, #1A1A1C 100%), #211F20;
    min-height: 350px;
}

.footer_wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 0;
}

.footer_wrapper img {
    align-self: end;
    justify-self: end;
}

footer .contacts,
footer .location {
    justify-self: center;
    align-self: center;
    max-width: 278px;
    min-height: 234px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

footer .contacts img,
footer .location img {
    padding-right: 20px;
}

footer .contacts {
    justify-self: start;
}

footer .contacts h3,
footer .location h3 {
    color: #FFFFFF;
    letter-spacing: 0.03rem;
}

footer .contacts a {
    white-space: nowrap;
}

footer .contacts a,
footer .location a {
    position: relative;
    color: #F1CDB3;
    transition: 0.15s ease-in-out;
    display: flex;
    align-items: center;
}

footer .contacts a:hover,
footer .location a:hover {
    color: #FDDCC4;
}

@media screen and (max-width: 1280px) and (min-width: 768px) {
    header {
        margin-top: 0;
        min-height: 120px;
    }

    header nav {
        width: calc(100% - 60px);
    }

    .pagination {
        min-height: 1733px;

    }

    .cards_wrapper {
        grid-template-columns: repeat(2, 50%);
        grid-template-rows: repeat(3, 1fr);
        width: calc(100% - 60px);
        min-height: 1733px;
    }

    .card {
        height: 435px;
    }

    .footer_wrapper {
        width: calc(100% - 60px);
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (max-width: 768px) {
    header {
        margin-top: 0;
        min-height: 120px;
        max-width: 100vw;
    }

    header nav {
        margin: 0;
        width: 100%;
        position: relative;
    }

    nav .menu-burger {
        margin-right: 1rem;
        padding: 0;
        appearance: none;
        outline: none;
        border: none;
        background: transparent;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 22px;
        z-index: 5;
        transition: .3s ease-in-out;
    }

    .menu-burger-rotate {
        transform: rotate(90deg);
    }

    nav .menu-burger span {
        width: 30px;
        height: 2px;
    }

    .menu-burger-span {
        background-color: #000000;
    }

    .menu-burger-rotate-span {
        background-color: #F1CDB3;
    }

    nav .menu-burger span:last-of-type {
        margin-bottom: 0;
    }

    .header-menu {
        position: absolute;
        top: 0;
        transform: translateX(120%);
    }

    nav .menu-open {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background-color: #292929;
        z-index: 3;
        max-width: 320px;
        min-width: 100vw;
        min-height: 100vh;
        height: 100vh;
        animation: slideIn 0.4s ease-in-out;
        transform: translateX(0%);
    }

    .menu-open ul {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        transform: translateY(-85%);
    }

    .menu-open li a {
        font-size: 32px;
    }

    .menu-open li {
        padding: 0;
    }

    .menu-open .logo_wrapper {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
    }

    nav .menu-open .logo_wrapper {
        align-self: start;
    }


    nav .menu-open a {
        color: #CDCDCD;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0%);
        }
    }

    .not-only_wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .not-only_text-wrapper {
        width: 95%;
        text-align: center;
    }

    .not-only_text-wrapper .button-primary {
        margin: 0 auto;
    }

    .about_wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .about_wrapper img {
        order: 2;
    }

    .about_text-wrapper {
        width: 90%;
    }

    .cards_wrapper {
        display: flex;
        flex-direction: column;
        width: calc(100% - 60px);
    }

    .cards_wrapper {
        grid-template-columns: repeat(2, 50%);
        grid-template-rows: repeat(2, 50%);
        width: calc(85% - 60px);
    }

    .help_wrapper {
        width: 90%;
    }

    .help_wrapper-grid {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows:repeat(5, 1fr);
        grid-gap: 20px;
    }

    .in-addition_wrapper {
        display: flex;
        flex-direction: column;
        width: 90%;
    }

    .in-addition_text-wrapper {
        max-width: 90vw;
    }

    .in-addition a {
        width: 95vw;
        font-size: 16px;
    }

    .footer_wrapper {
        width: calc(100% - 60px);
        display: flex;
        flex-direction: column;
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.fadeIn {
    animation-name: fadeIn;
    animation-duration: .5s;
    animation-timing-function: ease-in-out;
}

.fade-on {
    top: 0;
    z-index: 2;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(41, 41, 41, 0.6);
}

.hidden {
    display: none;
}