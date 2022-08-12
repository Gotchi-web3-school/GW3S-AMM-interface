import React from "react"

const JohnAaveBoat: React.FC<{name?: any, color?: any, size?: any}> = ({ name, color, size = "150" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
  <g className="gotchi-bg">
    <defs fill="#fff">
      <pattern id="a" patternUnits="userSpaceOnUse" width="4" height="4">
        <path d="M0 0h1v1H0zm2 2h1v1H2z" />
      </pattern>
      <pattern id="b" patternUnits="userSpaceOnUse" x="0" y="0" width="2" height="2">
        <path d="M0 0h1v1H0z" />
      </pattern>
      <pattern id="c" patternUnits="userSpaceOnUse" x="-2" y="0" width="8" height="1">
        <path d="M0 0h1v1H0zm2 0h1v1H2zm2 0h1v1H4z" />
      </pattern>
      <pattern id="d" patternUnits="userSpaceOnUse" x="0" y="0" width="4" height="4">
        <path d="M0 0h1v1H0zm0 2h1v1H0zm1 0V1h1v1zm1 0h1v1H2zm0-1h1V0H2zm1 2h1v1H3z" />
      </pattern>
      <pattern id="e" patternUnits="userSpaceOnUse" width="64" height="32">
        <path d="M4 4h1v1H4zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1z" />
        <path fill="url(#a)" d="M0 8h64v7H0z" />
        <path fill="url(#b)" d="M0 16h64v1H0z" />
        <path fill="url(#c)" d="M0 18h64v1H0z" />
        <path fill="url(#b)" d="M22 18h15v1H22zM0 20h64v3H0z" />
        <path fill="url(#d)" d="M0 24h64v8H0z" />
      </pattern>
      <mask id="f">
        <path fill="url(#e)" d="M0 0h64v32H0z" />
      </mask>
    </defs>
    <path fill="#fff" d="M0 0h64v32H0z" />
    <path fill="#dea8ff" className="gotchi-secondary" mask="url(#f)" d="M0 0h64v32H0z" />
    <path fill="#dea8ff" className="gotchi-secondary" d="M0 32h64v32H0z" />
    <path mask="url(#f)" fill="#fff" transform="matrix(1 0 0 -1 0 64)" d="M0 0h64v32H0z" />
  </g>
  <style>
    {`.gotchi-primary{fill:#282473;}
    .gotchi-secondary{fill:#489FF8;}
    .gotchi-cheek{fill:#F696C6;}
    .gotchi-eyeColor{fill:#282473;}
    .gotchi-primary-mouth{fill:#282473;}
    .gotchi-sleeves-up{display:none;}
    .gotchi-handsUp{display:none;}
    .gotchi-handsDownOpen{display:block;}
    .gotchi-handsDownClosed{display:none;}
.wearable-bg {
    display:none;
}

 
    .gotchi-bg {
    display:none;
  }




svg {
  animation-name:down;
  animation-duration:0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-timing-function: steps(1);
}

.gotchi-shadow {
  animation: up 0.5s infinite linear steps(2);
   animation-name:up;
   animation-duration:0.5s;
   animation-iteration-count: infinite;
   animation-timing-function: linear;
   animation-timing-function: steps(2);
}

.gotchi-wearable {
  animation-name:down;
  animation-duration:0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-timing-function: steps(1);
  
  transition: all .5s ease-in-out
}

.wearable-bg {
    animation-name:none !important;
}


.gotchi-handsDownClosed, .gotchi-handsUp, .gotchi-handsDownOpen, .gotchi-handsDownClosed, .gotchi-body, .gotchi-eyeColor, .gotchi-collateral, .gotchi-cheek, .gotchi-primary-mouth, .gotchi-wearable, .gotchi-sleeves   {
   animation-name:down;
   animation-duration:0.5s;
   animation-iteration-count: infinite;
   animation-timing-function: linear;
   animation-timing-function: steps(2);
}

.wearable-hand {
  animation-name:down !important;
  animation-duration:0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-timing-function: steps(2);
}
`}
</style>
  <g className="gotchi-bg">
    <defs fill="#fff">
      <pattern id="a" patternUnits="userSpaceOnUse" width="4" height="4">
        <path d="M0 0h1v1H0zm2 2h1v1H2z" />
      </pattern>
      <pattern id="b" patternUnits="userSpaceOnUse" x="0" y="0" width="2" height="2">
        <path d="M0 0h1v1H0z" />
      </pattern>
      <pattern id="c" patternUnits="userSpaceOnUse" x="-2" y="0" width="8" height="1">
        <path d="M0 0h1v1H0zm2 0h1v1H2zm2 0h1v1H4z" />
      </pattern>
      <pattern id="d" patternUnits="userSpaceOnUse" x="0" y="0" width="4" height="4">
        <path d="M0 0h1v1H0zm0 2h1v1H0zm1 0V1h1v1zm1 0h1v1H2zm0-1h1V0H2zm1 2h1v1H3z" />
      </pattern>
      <pattern id="e" patternUnits="userSpaceOnUse" width="64" height="32">
        <path d="M4 4h1v1H4zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1z" />
        <path fill="url(#a)" d="M0 8h64v7H0z" />
        <path fill="url(#b)" d="M0 16h64v1H0z" />
        <path fill="url(#c)" d="M0 18h64v1H0z" />
        <path fill="url(#b)" d="M22 18h15v1H22zM0 20h64v3H0z" />
        <path fill="url(#d)" d="M0 24h64v8H0z" />
      </pattern>
      <mask id="f">
        <path fill="url(#e)" d="M0 0h64v32H0z" />
      </mask>
    </defs>
    <path fill="#fff" d="M0 0h64v32H0z" />
    <path fill="#dea8ff" className="gotchi-secondary" mask="url(#f)" d="M0 0h64v32H0z" />
    <path fill="#dea8ff" className="gotchi-secondary" d="M0 32h64v32H0z" />
    <path mask="url(#f)" fill="#fff" transform="matrix(1 0 0 -1 0 64)" d="M0 0h64v32H0z" />
  </g>
  <g className="gotchi-body">
    <path d="M47 14v-2h-2v-2h-4V8h-4V6H27v2h-4v2h-4v2h-2v2h-2v41h4v-2h5v2h5v-2h6v2h5v-2h5v2h4V14z" className="gotchi-primary" />
    <path d="M45 14v-2h-4v-2h-4V8H27v2h-4v2h-4v2h-2v39h2v-2h5v2h5v-2h6v2h5v-2h5v2h2V14z" className="gotchi-secondary" />
    <path d="M18,49h2v-1h2v1h2v2h5v-2h2v-1h2v1h2v2h5v-2h2v-1h2v1h1V14h-4v-2h-4v-2h-5V9h-5v2h-4v2h-4v2h-1V49z" fill="#fff" />
  </g>
  <path className="gotchi-cheek" d="M21 32v2h2v-2h-1zm21 0h-1v2h2v-2z" />
  <g className="gotchi-primary-mouth">
    <path d="M29 32h-2v2h2v-1z" />
    <path d="M33 34h-4v2h6v-2h-1z" />
    <path d="M36 32h-1v2h2v-2z" />
  </g>
  <g className="gotchi-shadow">
    <path opacity=".25" d="M25 58H19v1h1v1h24V59h1V58h-1z" fill="#000" />
  </g>
  ,
  <g className="gotchi-collateral">
    <g fill="#282473">
      <path d="M37 15h-1v4h1zm-3 5h1v1h-1z" />
      <path d="M35 19h1v1h-1zm-6 1h1v1h-1z" />
      <path d="M34 22v-1h-4v1z" />
    </g>
    <g fill="#489ff8">
      <path d="M30.5 15v1h1v3h1v-3h1v-1zm-.5-3v1h4v-1z" />
      <path d="M34 13h1v1h-1zm-7 6h1v-4h-1zm2-6h1v1h-1z" />
      <path d="M28 14h1v1h-1z" />
    </g>
  </g>
  <g className="gotchi-eyeColor">
    <path d="M23 28V29V30H24H25H26H27V29V28H28H29V27V26V25V24H28H27V23V22H26H25H24H23V23V24H22H21V25V26V27V28H22H23Z" />
    <path d="M35 24V25V26V27V28H36H37V29V30H38H39H40H41V29V28H42H43V27V26V25V24H42H41V23V22H40H39H38H37V23V24H36H35Z" />
  </g>
  <g className="gotchi-wearable wearable-body">
    <svg x="12" y="33">
      <path d="M3,20h34V0h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-8v1h-4V6h-8V5H9V4H8V3H7V2H6V1H5V0H3V20z" fill="#501e87" />
      <path d="M35,2h-1v1h-1v1h-1v1h-1v1h-1v1h-8v1h-4V7h-8V6H9V5H8V4H7V3H6V2H5V1H4v18h32V1h-1V2z" fill="#824ee2" />
      <path d="M33 10h-1V7h-1v4h3v-1h-1zm-1 2h-1v1h2v1h-2v3h3v-1h-2v-1h2v-3h-2zM7 12H6v1h2v1H6v3h3v-1H7v-1h2v-3H7zm0-2V7H6v4h3v-1H7z" fill="#501e87" />
      <path d="M27 13v-1h-1v-1h-1v-1h-3v1h-1v1h-2v1h-1v1h-3v-1h-1v-3h1V9h3v1h1v1h1V9h-1V8h-1V7h-3v1h-1v1h-1v1h-1v3h1v1h1v1h1v1h3v-1h1v-1h2v-1h1v-1h3v1h1v3h-1v1h-3v-1h-1v-1h-1v2h1v1h1v1h3v-1h1v-1h1v-1h1v-3h-1z" fill="#fff" />
      <defs />
    </svg>
  </g>
  <g className="gotchi-handsDownClosed">
    <g className="gotchi-primary">
      <path d="M19 42h1v1h-1zm1-6h1v1h-1z" />
      <path d="M21 37h1v1h-1zm5 3v4h1v-4zm-5 3h-1v1h2v-1z" />
      <path d="M24 44h-2v1h4v-1h-1zm1-5h-1v1h2v-1z" />
      <path d="M23 38h-1v1h2v-1z" />
    </g>
    <g className="gotchi-secondary">
      <path d="M19 43h1v1h-1zm5 2h-2v1h4v-1h-1z" />
      <path d="M27 41v3h1v-3zm-6 3h-1v1h2v-1z" />
      <path d="M26 44h1v1h-1zm-7-3h-1v2h1v-1z" />
    </g>
    <g className="gotchi-primary">
      <path d="M44 42h1v1h-1zm-1-6h1v1h-1z" />
      <path d="M42 37h1v1h-1z" />
      <path d="M42 39v-1h-2v1h1zm0 4v1h2v-1h-1z" />
      <path d="M40 44h-2v1h4v-1h-1z" />
      <path d="M38 42v-2h-1v4h1v-1z" />
      <path d="M40 40v-1h-2v1h1z" />
    </g>
    <g className="gotchi-secondary">
      <path d="M42 44v1h2v-1h-1zm-5-2v-1h-1v3h1v-1z" />
      <path d="M40 45h-2v1h4v-1h-1z" />
      <path d="M37 44h1v1h-1zm7-1h1v1h-1z" />
    </g>
  </g>
  <g className="gotchi-handsDownOpen">
    <g className="gotchi-primary">
      <path d="M56 38v-1h-2v-1h-2v-1h-1v-1h-1v-1h-1v8h1v1h2v1h4v-1h1v-4z" />
    </g>
    <g className="gotchi-secondary">
      <path d="M54 38v-1h-2v-1h-1v-1h-1v-1h-1v6h1v1h2v1h4v-4z" />
    </g>
    <path d="M54,38v-1h-2v-1h-1v-1h-1v-1h-1v5h1v1h2v1h4v-3H54z" fill="#fff" />
    <g className="gotchi-primary">
      <path d="M8 38v-1h2v-1h2v-1h1v-1h1v-1h1v8h-1v1h-2v1H8v-1H7v-4z" />
    </g>
    <g className="gotchi-secondary">
      <path d="M10 38v-1h2v-1h1v-1h1v-1h1v6h-1v1h-2v1H8v-4z" />
    </g>
    <path d="M8,38v3h4v-1h2v-1h1v-5h-1v1h-1v1h-1v1h-2v1H8z" fill="#fff" />
  </g>
  <g className="gotchi-handsUp">
    <g className="gotchi-secondary">
      <path d="M50,38h1v1h-1V38z" />
      <path d="M49 39h1v1h-1v-1zm2-2h1v1h-1v-1z" />
      <path d="M52,36h2v1h-2V36z" />
      <path d="M54,35h2v1h-2V35z" />
    </g>
    <path d="M52,32v1h-2v1h-1v5h1v-1h1v-1h1v-1h2v-1h2v-3H52z" fill="#fff" />
    <g className="gotchi-primary">
      <path d="M49,33h1v1h-1V33z" />
      <path d="M50 32h2v1h-2v-1zm0 7h1v1h-1v-1z" />
      <path d="M49 40h1v1h-1v-1zm2-2h1v1h-1v-1z" />
      <path d="M52 37h2v1h-2v-1zm0-6h4v1h-4v-1z" />
      <path d="M56,32h1v4h-1V32z" />
      <path d="M54,36h2v1h-2V36z" />
    </g>
    <g className="gotchi-secondary">
      <path d="M13,38h1v1h-1V38z" />
      <path d="M14 39h1v1h-1v-1zm-2-2h1v1h-1v-1z" />
      <path d="M10,36h2v1h-2V36z" />
      <path d="M8,35h2v1H8V35z" />
    </g>
    <path d="M8,32v3h2v1h2v1h1v1h1v1h1v-5h-1v-1h-2v-1H8z" fill="#fff" />
    <g className="gotchi-primary">
      <path d="M14,33h1v1h-1V33z" />
      <path d="M12 32h2v1h-2v-1zm1 7h1v1h-1v-1z" />
      <path d="M14 40h1v1h-1v-1zm-2-2h1v1h-1v-1z" />
      <path d="M10 37h2v1h-2v-1zm-2-6h4v1H8v-1z" />
      <path d="M7,32h1v4H7V32z" />
      <path d="M8,36h2v1H8V36z" />
    </g>
  </g>
  <g className="gotchi-wearable wearable-face">
    <svg x="9" y="18">
      <path d="M5 2H4V0H0v6h2v4h2v2h2V2z" fill="#64438e" />
      <path d="M5 4H4V2H2v4h2v4h2V4z" fill="#b464ed" />
      <g fill="#edd3fd">
        <path d="M4 4H2v2h2V5z" />
        <path d="M5 6H4v4h2V6z" />
      </g>
      <path d="M41 2h1V0h4v6h-2v4h-2v2h-2V2z" fill="#64438e" />
      <path d="M41 4h1V2h2v4h-2v4h-2V4z" fill="#b464ed" />
      <g fill="#edd3fd">
        <path d="M42 4h2v2h-2V5z" />
        <path d="M41 6h1v4h-2V6z" />
      </g>
    </svg>
  </g>
  <g className="gotchi-wearable wearable-head">
    <svg x="11" y="0">
      <path d="M42 14v-4h-2V8h-2V6h-2V4h-2V2h-4V0H18v2h-4v2h-2v2h-2v2H8v2H6v4H4v4H2v2H0v2h42v-2h-2v-2h-2v-4h-2v-2h-2v-2h4v2h2v2z" fill="#64438e" />
      <path d="M4 18v2h34v-2H4zm32-2v-2h-4v-2h-2v-2h2V8h4V6h-2V4h-4V2H18v2h-4v2h-2v2h-2v2H8v4H6v2h30z" fill="#947db0" />
      <path d="M20 16h2v2h-2z" fill="#edd3fd" />
      <g fill="#dea8ff">
        <path d="M20,17h1v1h-1V17z" />
        <path d="M21,16h1v1h-1V16z" />
      </g>
      <path d="M21,17h1v1h-1V17z" fill="#c260ff" />
      <path d="M24 8V7h-1V6h-1V5h-2v1h-1v1h-1v1h-1v4h1v1h1v1h1v1h2v-1h1v-1h1v-1h1V8z" fill="#64438e" />
      <g fill="#dea8ff">
        <path d="M18,10v2h1v1h1v1h1v-4H18z" />
        <path d="M23,8V7h-1V6h-1v4h3V8H23z" />
      </g>
      <path d="M21,10v4h1v-1h1v-1h1v-2H21z" fill="#c260ff" />
      <path d="M20,6v1h-1v1h-1v2h3V6H20z" fill="#edd3fd" />
    </svg>
  </g>
  
  <svg x="12" y="33">
    <g>
      <g className="gotchi-sleeves gotchi-sleeves-left gotchi-sleeves-up">
        <path d="M37,9h1V8h1V7h1V0h-2v1h-1V9z" fill="#501e87" />
        <path d="M38 7h1V1h-1v1h-1v6h1z" fill="#824ee2" />
        <defs />
      </g>
      <g className="gotchi-sleeves gotchi-sleeves-left gotchi-sleeves-down">
        <path d="M37 8h1v1h2V2h-1V1h-1V0h-1v8z" fill="#501e87" />
        <path d="M38 1h-1v6h1v1h1V2h-1z" fill="#824ee2" />
        <defs />
      </g>
      <g className="gotchi-sleeves gotchi-sleeves-right gotchi-sleeves-up">
        <path d="M3 1H2V0H0v7h1v1h1v1h1V1z" fill="#501e87" />
        <path d="M2 8h1V2H2V1H1v6h1z" fill="#824ee2" />
        <defs />
      </g>
      <g className="gotchi-sleeves gotchi-sleeves-right gotchi-sleeves-down">
        <path d="M3,0H2v1H1v1H0v7h2V8h1V0z" fill="#501e87" />
        <path d="M2 2H1v6h1V7h1V1H2z" fill="#824ee2" />
        <defs />
      </g>
    </g>
  </svg>
  <g className="gotchi-wearable wearable-hand wearable-hand-left">
    <svg x="3" y="31">
      <path d="M9 5V3H8V2H7V1H6V0H4v1H3v1H2v1H1v2H0v4h1v1h1v1h1v1h4v-1h1v-1h1V9h1V5z" fill="red" />
      <path d="M8 6V4H7V3H6V2H5V1H4v2H3v1H2v2H1v3h1v1h1v1h4v-1h1V9h1V6z" fill="#ff6f00" />
      <path d="M7 6V4H6V3H5v1H4v1H3V4H2v6h1v1h4V9h1V6z" fill="#fa0" />
      <g fill="#ff0">
        <path d="M6 6V5H4v1H3v2H2v2h1v1h3V9h1V7H6z" />
        <path d="M7 6h1v1H7zM6 4h1v1H6zM2 5h1v1H2z" />
      </g>
    </svg>
  </g>
  <g className="gotchi-wearable wearable-hand wearable-hand-right">
    <svg x="7" y="24">
      <g transform="scale(-1, 1) translate(-50, 0)">
        <path d="M6 3V2H5V1H4V0H3v1H2v1H1v1H0v2h1v1h1v1h1v24h1V7h1V6h1V5h1V3z" fill="#64438e" />
        <path d="M1 3h5v2H1z" fill="#c260ff" />
        <path d="M2 2h3v4H2z" fill="#dea8ff" />
        <path d="M3,1v6h1V1H3z" fill="#edd3fd" />
      </g>
    </svg>
  </g>
  <g className="gotchi-wearable wearable-pet">
    <svg x="5" y="46">
      <g fill="#00a0f5">
        <path d="M46 13h3v1h-3zm4 0h1v1h-1z" />
        <path d="M5 14h41v1H5z" />
        <path d="M2 13h3v1H2zm-2 0h1v1H0z" />
      </g>
      <path d="M54 1V0H44v1h.1v2H9.9V1h.1V0H3v1H2v1H1v8h1v1h1v1h1v1h1v1h41v-1h1v-1h1v-1h1v-1h1V9h1V8h1V7h1V6h1V5h1V4h1V3h1V1z" fill="#e1dad7" />
      <g fill="#fff">
        <path d="M54 2V1H44v2h7V2zM20 7h1v1h-1zM10 1H3v1H2v1h8zm14 6h1v1h-1z" />
        <path d="M54 2v1h-3v1H2v6h1v1h1v1h1v1h41v-1h1v-1h1v-1h1V9h1V8h1V7h1V6h1V5h1V4h1V3h1V2h-2zM18 9h-8V8h8v1zm4 2h-1V9h-1v2h-1V7h1V6h1v1h1v4zm4 0h-1V9h-1v2h-1V7h1V6h1v1h1v4zm4-1h-1v1h-1v-1h-1V6h1v4h1V6h1v4zm4-3h-2v1h2v1h-2v1h2v1h-3V6h3v1zm10 2h-9V8h9v1z" />
      </g>
    </svg>
  </g>
</svg>
    )
} 

export default JohnAaveBoat