(this["webpackJsonpfirst-react-blog"]=this["webpackJsonpfirst-react-blog"]||[]).push([[0],{19:function(e,t,c){},29:function(e,t,c){"use strict";c.r(t);var n=c(1),r=c.n(n),s=c(12),j=c.n(s),i=(c(19),c(5)),l=c(2),a=c(0),o=function(){return Object(a.jsxs)("nav",{className:"navbar",children:[Object(a.jsx)("h1",{children:"Johnny's Blog"}),Object(a.jsxs)("div",{className:"links",children:[Object(a.jsx)(i.b,{to:"/",children:"Home"}),Object(a.jsx)(i.b,{to:"/create",children:"New Blog"})]})]})},b=function(e){var t=e.blogs,c=e.title;return Object(a.jsxs)("div",{className:"blog-list",children:[Object(a.jsx)("h2",{children:c}),t.map((function(e){return Object(a.jsx)("div",{className:"blog-preview",children:Object(a.jsxs)(i.b,{to:"/blogs/".concat(e.id),children:[Object(a.jsx)("h2",{children:e.title}),Object(a.jsxs)("p",{children:["Written by: ",e.author]})]})},e.id)}))]})},d=c(6),h=function(e){var t=Object(n.useState)(null),c=Object(d.a)(t,2),r=c[0],s=c[1],j=Object(n.useState)(!0),i=Object(d.a)(j,2),l=i[0],a=i[1],o=Object(n.useState)(null),b=Object(d.a)(o,2),h=b[0],O=b[1];return Object(n.useEffect)((function(){var t=new AbortController;return fetch(e,{signal:t.signal}).then((function(e){if(!e.ok)throw Error("Could not fetch the data for that resource");return e.json()})).then((function(e){s(e),a(!1),O(null)})).catch((function(e){"AbortError"!==e.name&&(a(!1),O(e.message))})),function(){return t.abort()}}),[e]),{data:r,isPending:l,error:h}},O=function(){var e=h("http://localhost:8000/blogs"),t=e.data,c=e.isPending,n=e.error;return Object(a.jsxs)("div",{className:"home",children:[n&&Object(a.jsx)("div",{children:Object(a.jsx)("p",{children:n})}),c&&Object(a.jsx)("div",{children:Object(a.jsx)("p",{children:"Loading..."})}),t&&Object(a.jsx)(b,{blogs:t,title:"All Blogs"})]})},u=function(){var e=Object(n.useState)(""),t=Object(d.a)(e,2),c=t[0],r=t[1],s=Object(n.useState)(""),j=Object(d.a)(s,2),i=j[0],o=j[1],b=Object(n.useState)("John"),h=Object(d.a)(b,2),O=h[0],u=h[1],x=Object(n.useState)(!1),g=Object(d.a)(x,2),f=g[0],p=g[1],v=Object(l.f)();return Object(a.jsxs)("div",{className:"create",children:[Object(a.jsx)("h2",{children:"Add a New Blog"}),Object(a.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t={title:c,body:i,author:O};p(!0),fetch("http://localhost:8000/blogs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(){p(!1),v.push("/")}))},children:[Object(a.jsx)("label",{children:"Blog Title:"}),Object(a.jsx)("input",{type:"text",required:!0,value:c,onChange:function(e){return r(e.target.value)}}),Object(a.jsx)("label",{children:"Blog Body:"}),Object(a.jsx)("textarea",{value:i,onChange:function(e){return o(e.target.value)},required:!0}),Object(a.jsx)("label",{children:"Blog Author:"}),Object(a.jsxs)("select",{value:O,onChange:function(e){return u(e.target.value)},children:[Object(a.jsx)("option",{value:"John",children:"John"}),Object(a.jsx)("option",{value:"Mario",children:"Mario"})]}),!f&&Object(a.jsx)("button",{children:"Add Blog"}),f&&Object(a.jsx)("button",{disabled:!0,children:"Adding blog..."})]})]})},x=function(){var e=Object(l.g)().id,t=Object(l.f)(),c=h("http://localhost:8000/blogs/"+e),n=c.data,r=c.isPending,s=c.error;return Object(a.jsxs)("div",{className:"blog-details",children:[r&&Object(a.jsx)("div",{children:Object(a.jsx)("p",{children:"Loading..."})}),s&&Object(a.jsx)("div",{children:Object(a.jsx)("p",{children:s})}),n&&Object(a.jsxs)("article",{children:[Object(a.jsx)("h2",{children:n.title}),Object(a.jsxs)("p",{children:["Written by ",n.author]}),Object(a.jsx)("div",{children:Object(a.jsx)("p",{children:n.body})}),Object(a.jsx)("button",{onClick:function(){fetch("http://localhost:8000/blogs/"+n.id,{method:"DELETE"}).then((function(){t.push("/")}))},children:"Delete"})]})]})},g=function(){return Object(a.jsxs)("div",{className:"not-found",children:[Object(a.jsx)("h2",{children:"404"}),Object(a.jsx)("p",{children:"That page cannot be found"}),Object(a.jsx)(i.b,{to:"/",children:"Back to Home..."})]})};var f=function(){return Object(a.jsx)(i.a,{children:Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(o,{}),Object(a.jsx)("div",{className:"content",children:Object(a.jsxs)(l.c,{children:[Object(a.jsx)(l.a,{exact:!0,path:"/",children:Object(a.jsx)(O,{})}),Object(a.jsx)(l.a,{path:"/create",children:Object(a.jsx)(u,{})}),Object(a.jsx)(l.a,{path:"/blogs/:id",children:Object(a.jsx)(x,{})}),Object(a.jsx)(l.a,{path:"*",children:Object(a.jsx)(g,{})})]})})]})})};j.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(f,{})}),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.19e9f5a3.chunk.js.map