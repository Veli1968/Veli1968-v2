function showCheckBox2AllProfile() { $("html, body").animate({ scrollTop: 1e3 }, 100) }
document.addEventListener("scroll", function(e) { myMainOnScroll() }, !0), document.addEventListener("visibilitychange", function() { document.hidden || $("body").removeClass("lz_login_chk_complete") }), chrome.extension.sendMessage({}, function(e) { LiSearchResult.launch() });
var isLogin = !1,
    LiVersion = { isLinkedinDefault: function() { return !!$("nav#extended-nav").length } },
    LiSearchResult = { launch: function() { this_checkboxes = this, setInterval(function() { this_checkboxes.AddCheckboxes(), this_checkboxes.AddCheckBoxSelectAll(), this_checkboxes.AddProfileButton(), this_checkboxes.AddLoginCheck() }, 900) }, AddCheckboxes: function() { LiVersion.isLinkedinDefault() && (0 == $(".lz_checkbox_container").length && LinkedinDefaultSearchResult()) }, AddCheckBoxSelectAll: function() { LiVersion.isLinkedinDefault() && (0 == $(".lz_selectall_container").length && LinkedinDefaultSelectAll()) }, AddProfileButton: function() { LiVersion.isLinkedinDefault() && (0 == $(".lz_profile_container").length && LinkedinDefaultProfileButton()) }, AddLoginCheck: function() { 0 == $(".lz_login_chk_complete").length && LoginCheck() } };

function LinkedinDefaultSearchResult() {
    hidePopup(), $(".search-result--person").each(function(e) {
        if (0 == (n = $(this).find(".lz_checkbox_container")).length) {
            profile_path = $(this).find(".search-result__result-link").attr("href"), profile_name = $(this).find("span.name").text(), profile_title = $(this).find(".subline-level-1").text();
            var t = chrome.extension.getURL("assets/images/logo-icon-circle.png"),
                n = $(this).attr("id");
            $(this).find(".search-result__actions").append(' <div class="lz_checkbox_container"><img width="21px" src="' + t + '"><i id="' + n + '" pid="' + n + '" class="fa fa-square-o x-check" aria-hidden="true"></i></div>')
        }
    })
}

function LinkedinDefaultSelectAll() { addLoading(), $(".search-results__total").append('<div class="lz_selectall_container"><i id="selectall" class="fa fa-square-o s-check" aria-hidden="true"></i>Select All</div>') }

function addLoading() {!$(".loading-lz").length > 0 && $("body").prepend('<div class="loading-lz" style="display:none;">Loading&#8230;</div>') }

function LinkedinDefaultProfileButton() { addLoading(), $(".pv-top-card-section__body .pv-top-card-section__actions").append('<button type="button" id="btn-profile" class="btn lz_profile_container" style="display: inline-block;">Find Email</button>') }

function LoginCheck() {
    $("body").addClass("lz_login_chk_complete");
    var e = Base64.encode(JSON.stringify({ action: "chklogin" }));
    $.ajax({
        type: "POST",
        url: "https://apps.leadzippo.com/api_v2/_plugin/linkedin_api_v2.php",
        dataType: "text",
        data: { data: e },
        success: function(e) {
            var t = JSON.parse(Base64.decode(e));
            isLogin = t.access, checkLogin()
        }
    })
}

function parseProfilePage(e) {
    var t, n = {};
    if (t = e.find("code:contains('com.linkedin.voyager.identity.profile.Position')").html()) {
        var i = JSON.parse(t) || {},
            o = getHeadline(i, o) || {},
            a = getMiniProfile(i, o) || {},
            c = getCurrentCompany(getCompanies(i) || [], i),
            s = getContactLogo(i);
        return o && o.firstName && (n.contact_firstname = o.firstName), o && o.lastName && (n.contact_lastname = o.lastName), a && a.publicIdentifier && (n.contact_linkedin = a.publicIdentifier), o && o.firstName && o.lastName && (n.contact_fullname = n.contact_firstname + " " + n.contact_lastname), s && (n.contact_profile_picture = s), o && o.locationName && (n.contact_location = o.locationName), o && o.industryName && (n.contact_industry = o.industryName), c && c.length > 0 && (n.contact_companies = c), n
    }
}

function addContentPopup(e) {
    checkCheckBox(), profile_path = $("#" + e).find(".search-result__result-link").attr("href"), profile_name = $("#" + e).find("span.name").text(), profile_title = $("#" + e).find(".subline-level-1").text(), profile_img = $("#" + e).find("figure.search-result__image .EntityPhoto-circle-4").css('background-image'), "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" == profile_img && (profile_img = chrome.extension.getURL("assets/images/avatar_default.jpg"));
    if (profile_img) {
        profile_img = profile_img.replace("url(\"", "").replace("\")", "");
    } else {
        profile_img = "https://static.licdn.com/sc/h/djzv59yelk5urv2ujlazfyvrk";
    }
    var t = '<div id="pid-' + e + '" class="table-container border-bottom">    <table>            <tr>                <td>                    <div class="media">                        <p class="pull-left">                            <img src="' + profile_img + '" style="background:#b3b6b9;" width="35" height="35" class="media-photo">                        </p>                        <div class="media-body">                            <p class="lz-name">                            ' + profile_name + '                            </p>                            <p class="lz-title">' + profile_title + '</p>                        </div>                    </div>                </td>                <td class="remove-record"><a id="pid-' + e + '" class="p-remove" href="#">x</a></td>            </tr>    </table></div>';
    $("#lz_content").append(t)
}

function checkLogin() { isLogin ? ($("#btn-signin").hide(), $("#btn-process").show()) : ($("#btn-signin").show(), $("#btn-process").hide()) }

function uncheckCheckBox() { $(".lz-checked").each(function(e) { $(this).removeClass("fa-check-square"), $(this).addClass("fa-square-o"), $(this).removeClass("lz-checked") }) }

function checkAllCheckBox() { $(".x-check").each(function(e) { $(this).removeClass("fa-square-o"), $(this).addClass("fa-check-square"), $(this).addClass("lz-checked"), addContentPopup($(this).attr("pid")) }) }

function uncheckAllCheckBox() { $(".x-check").each(function(e) { $(this).removeClass("fa-check-square"), $(this).addClass("fa-square-o"), $(this).removeClass("lz-checked") }) }

function checkCheckBox() {
    var e = $(".lz-checked").length;
    e > 0 ? showPopup() : hidePopup(), $("#lz_profile_selected").html("<strong>" + e + " profiles selected.</strong>")
}

function showPopup() {
    checkLogin();
    var e = '<div id="lz_popup">    <div id="lz-logo"><img src="' + chrome.extension.getURL("assets/images/logo_dark.png") + '" width=100 />    <i class="fa fa-close lz-close" aria-hidden="true"></i>    <i class="fa fa-arrows lz-move" aria-hidden="true"></i>    </div>    <div id="lz_content"></div>    <div id="lz_button">    <button type="button" id="btn-signin" class="btn btn-md btn-block">Sign In</button>    <button type="button" id="btn-process" class="btn btn-md btn-block">Process</button>    </div>    <div id="lz_profile_selected"></div>    </div>';
    0 == $("#lz_popup").length && $("body").append(e), $("#lz_popup").draggable({ start: function() { $(this).css({ transform: "none", top: $(this).offset().top + "px", left: $(this).offset().left + "px" }) }, handle: ".lz-move" })
}

function hidePopup() { $("#lz_popup").remove() }

function myMainOnScroll() {
    $(".search-result--person").each(function(e) {
        if (0 == (n = $(this).find(".lz_checkbox_container")).length) {
            profile_path = $(this).find(".search-result__result-link").attr("href"), profile_name = $(this).find("span.name").text(), profile_title = $(this).find(".subline-level-1").text();
            var t = chrome.extension.getURL("assets/images/logo-icon-circle.png"),
                n = $(this).attr("id");
            $(this).find(".search-result__actions").append(' <div class="lz_checkbox_container"><img width="21px" src="' + t + '"><i id="' + n + '" pid="' + n + '" class="fa fa-square-o x-check" aria-hidden="true"></i></div>')
        }
    })
}

function cleanDomain(e) { if (e) return domain = e.toLowerCase(), domain = domain.allReplace({ "https://": "", "http://": "", "www.": "" }), domain = cleanUrlEnd(domain), domain }

function cleanUrlEnd(e) { return -1 != e.indexOf("/") && (e = e.substring(0, e.indexOf("/"))), -1 != e.indexOf("?") && (e = e.substring(0, e.indexOf("?"))), e }

function parseComp(e) {
    console.log(e);
    var t = {},
        n = $("<div />", { html: e }).find('code:contains("companyPageUrl")').html(),
        i = JSON.parse(n);
    if (i) {
        var o = getCompany(i),
            a = getCompanyAddress(i),
            c = getCompanySize(i);
        o && o.name && (t.company_name = o.name), o && o.companyPageUrl && (t.company_website = o.companyPageUrl), o && o.description && (t.company_description = o.description), o && o.industries && o.industries.length > 0 && (t.company_category = o.industries[0]), c && c.start && c.end && (t.company_size = c.start + " - " + c.end), c && c.$id && (t.company_id = c.$id.replace("urn:li:fs_normalized_company:", "").replace(",staffCountRange", ""));
        var s = getCompanyLogo(i, t.company_id);
        return s && s.id && (t.company_logo = s.id), t.address = "", a && a.line1 && (t.address1 = a.line1, t.address = a.line1), a && a.line2 && (t.address2 = a.line2, t.address += a.line2), a && a.city && (t.city = a.city, t.address += a.city), a && a.geographicArea && (t.state = a.geographicArea, t.address += a.geographicArea), a && a.postalCode && (t.postalCode = a.postalCode, t.address += a.postalCode), a && a.country && (t.country = a.country, t.address += a.country), t
    }
}

function parseProfile(e) {
    var t, n = {};
    if (t = e.find("code:contains('com.linkedin.voyager.identity.profile.Position')").html()) {
        var i = JSON.parse(t) || {},
            o = getHeadline(i, o) || {},
            a = getMiniProfile(i, o) || {},
            c = getCurrentCompany(getCompanies(i) || [], i),
            s = getContactLogo(i);
        return o && o.firstName && (n.contact_firstname = o.firstName), o && o.lastName && (n.contact_lastname = o.lastName), a && a.publicIdentifier && (n.contact_linkedin = a.publicIdentifier), o && o.firstName && o.lastName && (n.contact_fullname = n.contact_firstname + " " + n.contact_lastname), s && (n.contact_profile_picture = s), o && o.locationName && (n.contact_location = o.locationName), o && o.industryName && (n.contact_industry = o.industryName), c && c.length > 0 && (n.contact_companies = c), n
    }
}

function getCompany(e) { var t = e.included.filter(function(e) { return e.companyPageUrl }); return t && t.length > 0 ? t[0] : void 0 }

function getCompanyAddress(e) { var t = e.included.filter(function(e) { return "com.linkedin.common.Address" == e.$type }); return t && t.length > 0 ? t[0] : void 0 }

function getCompanyLogo(e, t) {
    var n = e.included.filter(function(e) { return "com.linkedin.voyager.common.MediaProcessorImage" == e.$type });
    if (n && n.length > 0)
        for (var i = 0; i < n.length; i++) { var o = n[i]; if (-1 != o.$id.indexOf(t + ",logo")) return o } else;
}

function getCompanySize(e) { var t = e.included.filter(function(e) { return "com.linkedin.voyager.organization.shared.StaffCountRange" == e.$type }); return t && t.length > 0 ? t[0] : void 0 }

function getHeadline(e, t) { return (t = e.included.filter(function(e) { return e.headline })) && t.length > 0 ? t[0] : void 0 }

function getContactLogo(e) {
    var t = e.included,
        n = t.filter(function(e) { if (JSON.stringify(e).indexOf("profile-displayphoto-shrink_") >= 0) return e }),
        i = t.filter(function(e) { if (JSON.stringify(e).indexOf("800_800") >= 0) return e });
    return n && 1 == n.length && i && 1 == i.length ? n[0].rootUrl + i[0].fileIdentifyingUrlPathSegment.split("&amp;").join("&") : void 0
}

function getMiniProfile(e, t) { var n = e.included.filter(function(e) { return "com.linkedin.voyager.identity.shared.MiniProfile" == e.$type }); return n && n.length > 0 && n.filter(function(e) { return e.lastName == t.lastName }), n && n.length > 0 ? n[0] : void 0 }

function getCompanies(e) { return e.included.filter(function(e) { return "com.linkedin.voyager.identity.profile.Position" == e.$type }) }

function getWorkPeriod(e, t) { var n = e.included.filter(function(e) { return e.$id == t.timePeriod }); if (n && n.length > 0) return n[0] }

function getCurrentCompany(e, t) {
    for (var n = [], i = 0; i < e.length; i++) {
        var o = getWorkPeriod(t, e[i]);
        o && (e[i].periodTime = o)
    }
    for (i = 0; i < e.length; i++) e[i] && e[i].periodTime && void 0 == e[i].periodTime.endDate && n.push(e[i]);
    if (n.length > 0) {
        mycompanies = [];
        for (i = 0; i < n.length; i++) {
            var a = n[i],
                c = "";
            a.companyUrn && (c = a.companyUrn.replace("urn:li:fs_miniCompany:", ""));
            var s = {};
            a.companyName && (s.name = a.companyName), c && (s.id = c), a.title && (s.position = a.title), c && (s.path = "/company-beta/" + c + "/"), c && mycompanies.push(s)
        }
        return mycompanies
    }
}
$(document).on("click", ".lz-close", function() { $("#lz_popup").remove(), uncheckCheckBox() }), $(document).on("click", "#btn-profile", function() {
    $("body").removeClass("lz_login_chk_complete");
    var e = '<div class="xoverlay"  style="display:none;"><div id="lz_window">    <div id="lz-logo">' + $("h1.pv-top-card-section__name").html() + '    <i class="fa fa-close lz-close" aria-hidden="true"></i>    <i class="fa fa-arrows lz-move" aria-hidden="true"></i>    </div>    <div id="lz_content"></div>    <div id="lz_profile_selected"><p class="left"></p><p class="right"> <a href="https://apps.leadzippo.com/login/" target="_blank">leadzippo.com</a></p></div>    </div>';
    if (0 == $(".xoverlay").length && $("body").append(e), $("#lz_window").draggable({ start: function() { $(this).css({ transform: "none", top: $(this).offset().top + "px", left: $(this).offset().left + "px" }) }, handle: ".lz-move" }), $(document).on("click", ".lz-close", function() { $(".xoverlay").remove() }), !isLogin) return $("#lz_content").prepend('<p style="padding-top: 40px; text-align:center;">You are not logged in.  <a target="_blank" href="https://apps.leadzippo.com/login/">Login</a></p><p style="text-align:center;">Don\'t have an account yet? <a target="_blank" href="https://apps.leadzippo.com/singup/">Signup</a></p>'), void $(".xoverlay").show();
    var t = parseProfilePage(e = $("<div />", { html: $("html").html() })),
        n = [];
    if (!t.contact_companies) return $("#lz_content").prepend("<p>" + $("h1.pv-top-card-section__name").html() + " - Website Not Found.</p>"), void $(".xoverlay").show();
    $("#lz_content").prepend("<p>" + $("h1.pv-top-card-section__name").html() + " - Website Found.</p>"), $(".xoverlay").show();
    var o = t.contact_companies[t.contact_companies.length - 1];
    n.push(o.path), n && n.length > 0 && function(e) {
        var t = $.Deferred(),
            n = [];
        for (i = 0; i < e.length; i++) {
            var o = e[i];
            n.push($.get(o))
        }
        return $.when.apply($, n).done(function() { t.resolve(arguments) }), t.promise()
    }(n).done(function(e) {
        var n = parseComp(e[0]),
            i = t,
            o = n,
            a = {};
        a.contact_fullname = i.contact_fullname, a.contact_firstname = i.contact_firstname, a.contact_lastname = i.contact_lastname, a.contact_profile_picture = i.contact_profile_picture, a.contact_linkedin = "https://www.linkedin.com/in/" + i.contact_linkedin, a.contact_location = i.contact_location, a.contact_industry = i.contact_industry, a.contact_position = i.contact_companies[0].position, a.company_name = i.contact_companies[0].name, a.company_logo = "https://media-exp2.licdn.com/mpr/mpr/shrinknp_100_100" + o.company_logo, a.company_website = cleanDomain(o.company_website), a.company_category = o.company_category, a.company_size = o.company_size, a.company_address = o.address, a.company_address1 = o.address1, a.company_address2 = o.address2, a.company_city = o.city, a.company_state = o.state, a.company_postalCode = o.postalCode, a.company_country = o.country, a.company_linkedin = "https://www.linkedin.com/company/" + o.company_id, a.company_description = o.company_description, a.company_source = "Li", a.contact_source = "Li";
        var c = [];
        c.push(a), $("#lz_content").append("<br/><p>" + c.length + " records added for processing. You will be redirected to leadzippo.com shortly. </p>"), $.ajax({ type: "POST", url: "https://apps.leadzippo.com/api_v2/_post/postApi.php", dataType: "text", data: { data: Base64.encode(JSON.stringify(c)) }, success: function(e) {} }), setTimeout(function() { window.open(" https://apps.leadzippo.com/people-search/single.php", "_blank"), $(".loading-lz").hide() }, 2e3)
    })
}), $(document).on("click", ".p-remove", function() {
    var e = (e = $(this).attr("id")).substring(4, e.length);
    $("i#" + e).removeClass("lz-checked"), $("i#" + e).removeClass("fa-check-square"), $("i#" + e).addClass("fa-square-o"), $("#pid-" + e).remove(), checkCheckBox()
}), $(document).on("click", ".s-check", function() { $("#lz_content").empty(), $(this).hasClass("fa-check-square") ? ($(this).removeClass("fa-check-square"), $(this).addClass("fa-square-o"), $(this).removeClass("lz-checkall"), uncheckAllCheckBox(), $("#lz_popup").remove()) : ($(this).addClass("fa-check-square"), $(this).removeClass("fa-square-o"), $(this).addClass("lz-checkedall"), checkAllCheckBox()) }), $(document).on("click", ".x-check", function() {
    if ($(this).hasClass("fa-check-square")) {
        $(this).removeClass("fa-check-square"), $(this).addClass("fa-square-o"), $(this).removeClass("lz-checked");
        var e = $(this).attr("pid");
        $("#pid-" + e).remove()
    } else { $(this).addClass("fa-check-square"), $(this).removeClass("fa-square-o"), $(this).addClass("lz-checked"), addContentPopup(e = $(this).attr("pid")) }
    checkCheckBox(), checkLogin()
}), $(document).on("click", "#btn-signin", function() { window.open("http://apps.leadzippo.com/login", "_blank") }), $(document).on("click", "#btn-process", function() {
    var e = '<div class="xoverlay"  style="display:none;"><div id="lz_window">    <div id="lz-logo"><img src="' + chrome.extension.getURL("assets/images/logo_dark.png") + '" width=100 />    <i class="fa fa-close lz-close" aria-hidden="true"></i>    <i class="fa fa-arrows lz-move" aria-hidden="true"></i>    </div>    <div id="lz_content_notify"></div>    <div id="lz_profile_selected"><p class="left"></p><p class="right"> <a href="https://apps.leadzippo.com/login/" target="_blank">apps.leadzippo.com</a></p></div>    </div>';
    0 == $(".xoverlay").length && $("body").append(e), $("#lz_window").draggable({ start: function() { $(this).css({ transform: "none", top: $(this).offset().top + "px", left: $(this).offset().left + "px" }) }, handle: ".lz-move" }), $(document).on("click", ".lz-close", function() { $(".xoverlay").remove() }), $(".xoverlay").show();
    var t, n, o = [],
        a = [];
    (t = $.Deferred(), n = [], $(".search-result--person").each(function(e) { $(this).find(".lz-checked").length > 0 && (profile_path = $(this).find(".search-result__result-link").attr("href"), n.push($.get(profile_path))) }), $.when.apply($, n).done(function() { t.resolve(arguments) }), t.promise()).done(function(e) {
        var t = [];
        if (Array.isArray(e[0]))
            for (i = 0; i < e.length; i++) {
                var n;
                if ((n = parseProfile($("<div />", { html: e[i][0] }))).contact_companies ? $("#lz_content_notify").append("<p>" + n.contact_firstname + " " + n.contact_lastname + ' - <span id="lz-lead' + i + '">Website Found</span></p>') : $("#lz_content_notify").append("<p>" + n.contact_firstname + " " + n.contact_lastname + ' - <span id="lz-lead' + i + '">Website not found</span></p>'), n.contact_companies) {
                    var c = n.contact_companies[n.contact_companies.length - 1];
                    o.push(n), t.push(c.path.replace("company-beta", "company"))
                }
            } else if ((n = parseProfile($("<div />", { html: e[0] }))).contact_companies ? $("#lz_content_notify").append("<p>" + n.contact_firstname + " " + n.contact_lastname + ' - <span id="lz-lead">Website Found</span></p>') : $("#lz_content_notify").append("<p>" + n.contact_firstname + " " + n.contact_lastname + ' - <span id="lz-lead">Website not found</span></p>'), n.contact_companies) {
                c = n.contact_companies[n.contact_companies.length - 1];
                console.log(c.path);
                o.push(n), t.push(c.path.replace("company-beta", "company"))
            }
        t && t.length > 0 && function(e) {
            var t = $.Deferred(),
                n = [];
            for (i = 0; i < e.length; i++) {
                var o = e[i];
                n.push($.get(o))
            }
            return $.when.apply($, n).done(function() { t.resolve(arguments) }), t.promise()
        }(t).done(function(e) {
            var t = [];
            if (Array.isArray(e[0]))
                for (i = 0; i < e.length; i++) {
                    // console.log(e[i][0]);
                    var n = parseComp(e[i][0]);
                    a.push(n)
                } else {
                    n = parseComp(e[0]);
                    a.push(n)
                }
            for (var i = 0; i < o.length; i++)
                for (var c = 0; c < a.length; c++) {
                    var s = o[i],
                        l = a[c],
                        r = s.contact_companies[s.contact_companies.length - 1];
                    if (r.id == l.company_id) {
                        var d = {};
                        d.contact_fullname = s.contact_fullname, d.contact_firstname = s.contact_firstname, d.contact_lastname = s.contact_lastname, d.contact_profile_picture = s.contact_profile_picture, d.contact_linkedin = "https://www.linkedin.com/in/" + s.contact_linkedin, d.contact_location = s.contact_location, d.contact_industry = s.contact_industry, d.contact_position = r.position, d.company_name = r.name, d.company_logo = "https://media-exp2.licdn.com/mpr/mpr/shrinknp_100_100" + l.company_logo, d.company_website = cleanDomain(l.company_website), d.company_category = l.company_category, d.company_size = l.company_size, d.company_address = l.address, d.company_address1 = l.address1, d.company_address2 = l.address2, d.company_city = l.city, d.company_state = l.state, d.company_postalCode = l.postalCode, d.company_country = l.country, d.company_linkedin = "https://www.linkedin.com/company/" + l.company_id, d.company_description = l.company_description, d.company_source = "Li", d.contact_source = "Li", t.push(d)
                    }
                }
            $("#lz_content_notify").append("<br/><p>" + t.length + " records added for processing. You will be redirected to leadzippo.com shortly. </p>"), $.ajax({ type: "POST", url: "https://apps.leadzippo.com/api_v2/_post/postApi.php", dataType: "text", data: { data: Base64.encode(JSON.stringify(t)) }, success: function(e) {} }), setTimeout(function() { window.open(" https://apps.leadzippo.com/people-search/single.php", "_blank") }, 5e3)
        })
    })
}), String.prototype.allReplace = function(e) { var t = this; for (var n in e) t = t.replace(new RegExp(n, "g"), e[n]); return t };
s