(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{"3BQx":function(n,o,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/dropdown/DropdownExample.demo",function(){var n=e("n7nP");return{page:n.default||n}}])},n7nP:function(n,o,e){"use strict";e.r(o),e.d(o,"default",function(){return c});var t=e("mXGw"),r=e.n(t),i=e("c2a7"),p=r.a.createElement;function c(){var n=Object(t.useRef)(),o=Object(t.useState)(!1),e=o[0],c=o[1];return p(r.a.Fragment,null,p(i.Button,{innerRef:n,onClick:function(){return c(!0)},size:"small",kind:"primary",skin:"outline"},"Options"),p(i.Dropdown,{anchorRef:n,open:e,onClose:function(){c(!1),n.current.focus()},popperProps:{placement:"right-start"}},p(i.DropdownItem,{onClick:console.log},"Item #1"),p(i.Tooltip,{text:"Disabled item"},p(i.DropdownItem,{onClick:console.log,disabled:!0},"Item #2")),p(i.DropdownDivider,null),p(i.DropdownItem,{component:"a",href:"/"},"Link item"),p(i.DropdownItem,{type:"danger",onClick:console.log},"Item #3")))}}},[["3BQx",1,0]]]);