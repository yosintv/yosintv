jQuery.cookie = function (x, p, i) {
    if (typeof p != "undefined") {
        i = i || {};
        if (p === null) {
            p = "";
            i.expires = -1
        }
        var u = "";
        if (i.expires && (typeof i.expires == "number" || i.expires.toUTCString)) {
            var s;
            if (typeof i.expires == "number") {
                s = new Date();
                s.setTime(s.getTime() + (i.expires * 24 * 60 * 60 * 1000))
            } else {
                s = i.expires
            }
            u = "; expires=" + s.toUTCString()
        }
        var n = i.path ? "; path=" + (i.path) : "";
        var r = i.domain ? "; domain=" + (i.domain) : "";
        var y = i.secure ? "; secure" : "";
        document.cookie = [x, "=", encodeURIComponent(p), u, n, r, y].join("")
    } else {
        var v = null;
        if (document.cookie && document.cookie != "") {
            var o = document.cookie.split(";");
            for (var q = 0; q < o.length; q++) {
                var w = jQuery.trim(o[q]);
                if (w.substring(0, x.length + 1) == (x + "=")) {
                    v = decodeURIComponent(w.substring(x.length + 1));
                    break
                }
            }
        }
        return v
    }
};
var COOKIE_NAME = "website_clock";
var options = {
    path: "/",
    expires: 1
};
var d = new Date();
var defaultTimeZone = d.getTimezoneOffset() / 60;
var defaultTimeZone_mins = d.getTimezoneOffset() % 60;
var timeZoneVar = 0;
var timeZoneVar_mins = 0;
var timezone = 0;
var timezone_hr = -1;
var timezone_mins = 0;
var dateIndex = 0;
var rightNow = new Date();
var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
var june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0);
var temp = jan1.toGMTString();
var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
temp = june1.toGMTString();
var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);
var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
var dst;
if (std_time_offset == daylight_time_offset) {
    dst = "1"
} else {
    var hemisphere = std_time_offset - daylight_time_offset;
    if (hemisphere >= 0) {
        std_time_offset = daylight_time_offset
    }
    dst = "1";
    std_time_offset += 1
}
defaultTimeZone = parseFloat(defaultTimeZone);
defaultTimeZone_mins = parseFloat(defaultTimeZone_mins);
jQuery().ready(function () {
    if (jQuery.cookie(COOKIE_NAME) != null) {
        timezone = jQuery.cookie(COOKIE_NAME)
    } else {
        timezone = convert(std_time_offset);
        jQuery.cookie(COOKIE_NAME, timezone, options)
    }
	
    timeZoneVar = timezone_hr +1//- dst; Manual adjustment
    timeZoneVar_mins = timezone_mins;
    jQuery("#timezone-select").val(timezone);
    changeTimeZone(timezone);
    startTime()
});

function changeTimeZone(b) {
	//console.log(b);
    zonetime = b.split(":");
    timezone_hr = zonetime[0];
    timezone_mins = zonetime[1];
    jQuery(".dt").each(function () {
        var a = jQuery(this).html();
        a = a.split(":");
        a[0] = parseFloat(a[0]) + parseFloat(timezone_hr) + parseFloat(timeZoneVar);
        a[1] = parseFloat(a[1]) + parseFloat(timezone_mins) + parseFloat(timeZoneVar_mins);
        if (a[1] < 0) {
            a[1] = parseInt(60) + parseFloat(a[1]);
            a[0] = parseFloat(a[0]) - parseInt(1)
        }
        if (a[1] > 59) {
            a[1] = parseFloat(a[1]) - parseFloat(60);
            a[0] = parseFloat(a[0]) + parseInt(1)
        }
        if (a[0] < 0) {
            a[0] = parseInt(24) + parseFloat(a[0])
        } else {
            if (a[0] > 23) {
                a[0] = parseFloat(a[0]) - parseInt(24)
            }
        }
        a[0] = checkTime(a[0]);
        a[1] = checkTime(a[1]);
        jQuery(this).html(a[0] + ":" + a[1])
    });
    jQuery.cookie(COOKIE_NAME, b, options);
    timezone_hr = parseFloat(timezone_hr) * parseFloat(-1);
    timeZoneVar = parseFloat(timezone_hr);
    timezone_mins = parseFloat(timezone_mins) * parseFloat(-1);
    timeZoneVar_mins = parseFloat(timezone_mins)
}

function startTime() {
    var f = new Date();
    var h = f.getHours() + parseInt(defaultTimeZone) - parseInt(timeZoneVar);
    var g = f.getMinutes() + parseInt(defaultTimeZone_mins) - parseInt(timeZoneVar_mins);
    var i = f.getSeconds();
    if (g < 0) {
        g = 60 + g;
        h = h - 1
    } else {
        if (g > 59) {
            g = g - 60;
            h = h + 1
        }
    } if (h < 0) {
        h = 24 + h
    } else {
        if (h > 23) {
            h = h - 24
        }
    }
    h = checkTime(h);
    g = checkTime(g);
    i = checkTime(i);
    jQuery("#clock").html(h + ":" + g + ":" + i);
    t = setTimeout("startTime()", 500)
}

function convert(i) {
    var h = parseInt(i);
    i -= parseInt(i);
    i *= 60;
    var j = parseInt(i);
    i -= parseInt(i);
    i *= 60;
    var k = parseInt(i);
    var g = h;
    if (h == 0) {
        g = "00"
    } else {
        if (h > 0) {
            g = (h < 10) ? "+0" + h : "+" + h
        } else {
            g = (h > -10) ? "-0" + Math.abs(h) : h
        }
    }
    j = (j < 10) ? "0" + j : j;
    return g + ":" + j
}

function checkTime(b) {
    if (b < 10) {
        b = "0" + b
    }
    return b
};
jQuery.cookie = function (key, value, options) {
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);
        if (value === null || value === undefined) {
            options.expires = -1;
        }
        if (typeof options.expires === 'number') {
            var days = options.expires,
                t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        value = String(value);
        return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
    }
    options = value || {};
    var result, decode = options.raw ? function (s) {
            return s;
        } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
