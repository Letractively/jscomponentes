var Drag={K:null,init:function(o,J,F,A,G,B,c,d,l,m){o.onmousedown=Drag.start;o.r=c?false:true;o.M=d?false:true;o.root=J&&J!=null?J:o;if(o.r&&isNaN(parseInt(o.root.style.left)))o.root.style.left="0px";if(o.M&&isNaN(parseInt(o.root.style.top)))o.root.style.top="0px";if(!o.r&&isNaN(parseInt(o.root.style.right)))o.root.style.right="0px";if(!o.M&&isNaN(parseInt(o.root.style.bottom)))o.root.style.bottom="0px";o.F=typeof F!='undefined'?F:null;o.G=typeof G!='undefined'?G:null;o.A=typeof A!='undefined'?A:null;o.B=typeof B!='undefined'?B:null;o.N=l?l:null;o.O=m?m:null;o.root.onDragStart=new Function();o.root.onDragEnd=new Function();o.root.onDrag=new Function();},start:function(e){var o=Drag.K=this;e=Drag.n(e);var y=parseInt(o.M?o.root.style.top:o.root.style.bottom);var x=parseInt(o.r?o.root.style.left:o.root.style.right);o.root.onDragStart(x,y);o.t=e.clientX;o.v=e.clientY;if(o.r){if(o.F!=null)o.C=e.clientX-x+o.F;if(o.A!=null)o.w=o.C+o.A-o.F;}else{if(o.F!=null)o.w=-o.F+e.clientX+x;if(o.A!=null)o.C=-o.A+e.clientX+x;}if(o.M){if(o.G!=null)o.D=e.clientY-y+o.G;if(o.B!=null)o.z=o.D+o.B-o.G;}else{if(o.G!=null)o.z=-o.G+e.clientY+y;if(o.B!=null)o.D=-o.B+e.clientY+y;}document.onmousemove=Drag.f;document.onmouseup=Drag.g;return false;},f:function(e){e=Drag.n(e);var o=Drag.K;var k=e.clientY;var j=e.clientX;var y=parseInt(o.M?o.root.style.top:o.root.style.bottom);var x=parseInt(o.r?o.root.style.left:o.root.style.right);var H,I;if(o.F!=null)j=o.r?Math.max(j,o.C):Math.min(j,o.w);if(o.A!=null)j=o.r?Math.min(j,o.w):Math.max(j,o.C);if(o.G!=null)k=o.M?Math.max(k,o.D):Math.min(k,o.z);if(o.B!=null)k=o.M?Math.min(k,o.z):Math.max(k,o.D);H=x+((j-o.t)*(o.r?1:-1));I=y+((k-o.v)*(o.M?1:-1));if(o.N)H=o.N(y);else if(o.O)I=o.O(x);Drag.K.root.style[o.r?"left":"right"]=H+"px";Drag.K.root.style[o.M?"top":"bottom"]=I+"px";Drag.K.t=j;Drag.K.v=k;Drag.K.root.onDrag(H,I);return false;},g:function(){document.onmousemove=null;document.onmouseup=null;Drag.K.root.onDragEnd(parseInt(Drag.K.root.style[Drag.K.r?"left":"right"]),parseInt(Drag.K.root.style[Drag.K.M?"top":"bottom"]));Drag.K=null;},n:function(e){if(typeof e=='undefined')e=window.event;if(typeof e.layerX=='undefined')e.layerX=e.offsetX;if(typeof e.layerY=='undefined')e.layerY=e.offsetY;return e;}};