var playspace,
  board,
  face,
  toolbar,
  zoomin,
  zoomout,
  flipbuttons,
  difficulty,
  generation,
  hint,
  nstatus,
  loading,
  cover,
  tooltip,
  timer,
  optionscopy,
  preloaded_images = [],
  images_to_preload = [
    "zoomin0.png",
    "zoomin1.png",
    "zoomout0.png",
    "zoomout1.png",
    "d-.png",
    "d0.png",
    "d1.png",
    "d2.png",
    "d3.png",
    "d4.png",
    "d5.png",
    "d6.png",
    "d7.png",
    "d8.png",
    "d9.png",
    "dg.png",
    "status0.png",
    "status1.png",
    "status2.png",
    "gen0.png",
    "gen1.png",
    "gen2.png",
    "gen3.png",
    "gen4.png",
    "gen5.png",
    "diff0.png",
    "diff1.png",
    "diff2.png",
    "diff3.png",
    "diff4.png",
    "diff5.png",
    "diff6.png",
    "diff7.png",
    "diff8.png",
    "diff9.png",
    "diff10.png",
    "diff11.png",
    "face0.png",
    "face1.png",
    "face2.png",
    "face3.png",
    "face4.png",
    "flip0.png",
    "flip1.png",
    "flip2.png",
    "flip3.png",
    "t0.png",
    "t1.png",
    "t-1.png",
    "t2.png",
    "t-2.png",
    "t3.png",
    "t-3.png",
    "t4.png",
    "t-4.png",
    "t5.png",
    "t-5.png",
    "t6.png",
    "t-6.png",
    "t7.png",
    "t8.png",
    "loading.gif",
  ],
  boarddims = [
    [9, 9, 10],
    [16, 16, 40],
    [30, 16, 99],
    [50, 50, 500],
    [100, 100, 2e3],
  ],
  ebs = [],
  digits = [],
  tiles = [],
  options = {
    zoom: 2,
    board: 0,
    w: 30,
    h: 16,
    m: 120,
    gen: 3,
    qmark: !0,
    flipbuttons: !1,
    disarm: !1,
  },
  game = {
    field: [],
    state: [],
    x: 16,
    y: 16,
    f: 256,
    m: 40,
    populated: !1,
    stopped: !1,
    outcome: 0,
    mleft: 0,
    tleft: 0,
    timestarted: 0,
    timeplayed: 0,
    elapsedtime: 0,
    cheated: !1,
  },
  stats = [
    [
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
    ],
    [
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
    ],
    [
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
    ],
    [
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [null, null],
      ],
    ],
  ],
  statsdlg = [
    [!1, !1, !1, !1],
    [!1, !1, !1, !1, !1, !1],
  ],
  state = {
    depressed: [],
    active: null,
    processtap: !1,
    hintinterval: null,
    hintat: null,
    hintd: 0,
    disarminterval: null,
    disarmat: null,
    disarmd: 0,
  },
  layout = { left: 20, top: 45 },
  loader = {
    timeout: null,
    start: function () {
      loader.timeout = setTimeout(function () {
        (nstatus.image.src = "media/status0.png"),
          $(cover).css("visibility", "visible"),
          $(loading.image).css("visibility", "visible");
      }, 100);
    },
    stop: function () {
      clearTimeout(loader.timeout),
        $(cover).css("visibility", "hidden"),
        $(loading.image).css("visibility", "hidden"),
        (nstatus.tooltiptext = everythingseemsok),
        (nstatus.image.src = "media/status1.png");
    },
  },
  visible = {
    options: !1,
    stats: !1,
    info: !1,
    mlanguages: !1,
    mothergames: !1,
  };
function setCookie(t, e, o) {
  var a = new Date();
  a.setTime(a.getTime() + 24 * o * 60 * 60 * 1e3);
  var i = "expires=" + a.toUTCString();
  document.cookie = t + "=" + e + ";" + i + ";path=/";
}
function getCookie(t) {
  for (
    var e = t + "=", o = document.cookie.split(";"), a = 0;
    a < o.length;
    a++
  ) {
    for (var i = o[a]; " " == i.charAt(0); ) i = i.substring(1);
    if (0 == i.indexOf(e)) return i.substring(e.length, i.length);
  }
  return "";
}
function random(t, e) {
  return Math.floor(Math.random() * (e - t + 1)) + t;
}
function scoutarea(t) {
  for (
    var e = [],
      o = t % game.x,
      a = Math.floor(t / game.x),
      i = 0 == o ? 0 : o - 1;
    i <= (o == game.x - 1 ? o : 1 + o);
    i++
  )
    for (var s = 0 == a ? 0 : a - 1; s <= (a == game.y - 1 ? a : a + 1); s++)
      e.push(i + s * game.x);
  return e;
}
function CreateBoard() {
  5 == options.board
    ? ((game.x = options.w), (game.y = options.h), (game.m = options.m))
    : ((game.x = boarddims[options.board][0]),
      (game.y = boarddims[options.board][1]),
      (game.m = boarddims[options.board][2])),
    (game.f = game.x * game.y);
  for (var t = tiles.length; t < game.f; t++) {
    var e = new Image(16, 16);
    (e.id = "tile" + t), $(board).append(e), tiles.push(e);
  }
  if (tiles.length > game.f) {
    for (t = game.f; t < tiles.length; t++) $(tiles[t]).remove();
    tiles = tiles.slice(0, game.f);
  }
}
function NewGame() {
  ClearHint(),
    ClearDisarm(state.disarmat),
    (game.state = Array.apply(null, Array(game.f)).map(
      Number.prototype.valueOf,
      -3
    )),
    (game.populated = !1),
    (game.cheated = !1),
    UpdateTiles(),
    (game.stopped = !1),
    (game.outcome = 0),
    (game.mleft = game.m),
    (game.tleft = game.f - game.m),
    $("#time").text("00:00"),
    UpdateMinesLeft(),
    $("#tleft").text(game.tleft),
    face.newface("media/face0.png");
  for (var t = 3; t < 6; t++) digits[t].src = "media/d0.png";
  clearInterval(timer);
}
function LoadGame() {
  UpdateTiles(),
    1 == game.outcome && face.newface("media/face3.png"),
    2 == game.outcome && face.newface("media/face2.png"),
    UpdateMinesLeft(),
    $("#tleft").text(game.tleft),
    setTimeout(function () {
      (game.timestarted = new Date().getTime() - game.timeplayed),
        UpdateTime(),
        game.stopped || (timer = setInterval(UpdateTime, 1e3));
    }, 0);
}
function toggleflag(t) {
  ClearHint(), ClearDisarm(t);
  var e = game.state[t];
  (-3 != e && -4 != e && -6 != e) ||
    (-3 == e && ((game.state[t] = -4), game.mleft--, UpdateMinesLeft()),
    (-4 != e && -6 != e) || (game.state[t] = -3),
    -4 == e && options.qmark && (game.state[t] = -6),
    -4 == e && (game.mleft++, UpdateMinesLeft()),
    UpdateTiles([t]));
}
function CreateField(t) {
  if (1 == options.gen) {
    game.field = Array.apply(null, Array(game.m))
      .map(Number.prototype.valueOf, -1)
      .concat(
        Array.apply(null, Array(game.f - game.m)).map(
          Number.prototype.valueOf,
          0
        )
      );
    for (var e = 0; e < game.f - 1; e++) {
      var o = random(e, game.f - 1),
        a = game.field[e];
      (game.field[e] = game.field[o]), (game.field[o] = a);
    }
  }
  if (2 == options.gen) {
    for (
      var i = Math.floor(t / game.x),
        s = t % game.x,
        n =
          (0 != s && s != game.x - 1) || (0 != i && i != game.y - 1)
            ? 0 == s || s == game.x - 1 || 0 == i || i == game.y - 1
              ? 6
              : 9
            : 4,
        l = Array.apply(null, Array(game.m))
          .map(Number.prototype.valueOf, -1)
          .concat(
            Array.apply(null, Array(game.f - game.m - n)).map(
              Number.prototype.valueOf,
              0
            )
          ),
        e = 0;
      e < l.length - 1;
      e++
    ) {
      (o = random(e, l.length - 1)), (a = l[e]);
      (l[e] = l[o]), (l[o] = a);
    }
    game.field = new Array(game.f);
    for (var r = 0, e = 0; e < game.x; e++)
      for (o = 0; o < game.y; o++)
        1 < Math.abs(e - s) || 1 < Math.abs(o - i)
          ? ((game.field[o * game.x + e] = l[r]), r++)
          : (game.field[o * game.x + e] = 0);
  }
  for (e = 0; e < game.f; e++)
    if (-1 == game.field[e])
      for (var m = scoutarea(e), o = 0; o < m.length; o++)
        0 <= game.field[m[o]] && game.field[m[o]]++;
  (game.populated = !0),
    setTimeout(function () {
      (game.timestarted = new Date().getTime()),
        (timer = setInterval(UpdateTime, 1e3));
    }, 0);
}
function GameLost() {
  (game.stopped = !0),
    (game.outcome = 2),
    SaveStats(),
    clearInterval(timer),
    (game.timeplayed = new Date().getTime() - game.timestarted),
    UpdateTime();
  for (var t = [], e = 0; e < game.f; e++)
    -1 == game.field[e] &&
      -3 == game.state[e] &&
      ((game.state[e] = -1), t.push(e)),
      -1 != game.field[e] &&
        -4 == game.state[e] &&
        ((game.state[e] = -5), t.push(e));
  UpdateTiles(t), face.newface("media/face2.png");
}
function GameWon() {
  (game.stopped = !0),
    (game.outcome = 1),
    (game.mleft = 0),
    (game.tleft = 0),
    SaveStats(),
    clearInterval(timer),
    (game.timeplayed = new Date().getTime() - game.timestarted),
    UpdateTime(),
    UpdateMinesLeft();
  for (var t = [], e = 0; e < game.f; e++)
    game.state[e] < 0 && ((game.state[e] = -4), t.push(e));
  UpdateTiles(t), face.newface("media/face3.png");
}
function SaveStats() {
  var t, e, o, a, i, s;
  game.populated &&
    ((t = new Date().getTime() - game.timestarted),
    (e = game.f - game.m - game.tleft),
    (o = options.gen - 1),
    game.cheated && (o = 3),
    (a = options.board),
    (i = game.outcome),
    stats[o][a][i][0]++,
    (stats[o][a][i][1] += t),
    (stats[o][a][i][2] += e),
    1 != i ||
      ((null == (s = stats[o][a][3][0]) || t < s) &&
        ((stats[o][a][3][0] = t), (stats[o][a][3][1] = new Date().getTime()))));
}
function ClearDisarm(t) {
  null != state.disarminterval &&
    t == state.disarmat &&
    (clearInterval(state.disarminterval), (state.disarminterval = null));
}
function uncover(t) {
  if ((ClearHint(), null == state.disarminterval)) {
    var e,
      o,
      a = [t];
    if (-1 == game.field[t])
      return (
        options.disarm
          ? ((state.disarmd = 0),
            (state.disarmat = t),
            (e = tiles[t].src),
            (o = "media/t-1.png"),
            (tiles[t].src = o),
            (state.disarminterval = setInterval(function () {
              if ((state.disarmd++, 6 <= state.disarmd))
                return (
                  clearInterval(state.disarminterval),
                  (state.disarminterval = null),
                  (game.state[t] = -2),
                  UpdateTiles(a),
                  void GameLost()
                );
              state.disarmd % 2 == 1
                ? (tiles[state.disarmat].src = e)
                : (tiles[state.disarmat].src = o);
            }, 500)))
          : ((game.state[t] = -2), UpdateTiles(a), GameLost()),
        !1
      );
    game.state[t] = game.field[t];
    for (var i = 0; i < a.length; i++) {
      var s = a[i];
      if (0 == game.field[s])
        for (var n = scoutarea(s), l = 0; l < n.length; l++)
          -3 == game.state[n[l]] &&
            ((game.state[n[l]] = game.field[n[l]]), a.push(n[l]));
    }
    return (
      (game.tleft -= a.length),
      $("#tleft").text(game.tleft),
      UpdateTiles(a),
      0 == game.tleft && GameWon(),
      !0
    );
  }
}
function ClearHint() {
  null != state.hintinterval &&
    (clearInterval(state.hintinterval),
    (state.hintinterval = null),
    UpdateTiles([state.hintat]));
}
function cheat() {
  game.populated &&
    !game.stopped &&
    ((game.cheated = !0),
    0 <= game.field[state.active] && requestuncover(state.active),
    -1 == game.field[state.active] &&
      ((game.state[state.active] = -4), UpdateTiles([state.active])));
}
function requesthint() {
  if (game.populated && !game.stopped && null == state.hintinterval) {
    game.cheated = !0;
    for (
      var t = game.x + " " + game.y + " " + game.m + "\n", e = 0;
      e < game.f;
      e++
    )
      t += String.fromCharCode(75 + game.state[e]);
    loader.start(),
      $.ajax({
        type: "POST",
        url: "hint.cgi",
        data: t,
        success: function (t) {
          var e = t.split("\n");
          if ("OK" != e[0])
            return (
              loader.stop(),
              (nstatus.image.src = "media/status2.png"),
              void (nstatus.tooltiptext = hintunavailable)
            );
          var o,
            a = Number(e[2]);
          "FLAG" == e[1] && (o = "media/t-4.png"),
            "OPEN" == e[1] && (o = "media/t0.png"),
            $(document).scrollTop(
              $(tiles[a]).offset().top - $(window).height() / 2
            ),
            $(document).scrollLeft(
              $(tiles[a]).offset().left - $(window).width() / 2
            );
          var i = tiles[a].src;
          (state.hintat = a),
            (state.hintd = 0),
            (tiles[a].src = o),
            (state.hintinterval = setInterval(function () {
              state.hintd++,
                1 < state.hintd && (state.hintd = 0),
                0 == state.hintd ? (tiles[a].src = o) : (tiles[a].src = i);
            }, 400)),
            loader.stop();
        },
        error: function () {
          loader.stop(),
            (nstatus.image.src = "media/status2.png"),
            (nstatus.tooltiptext = connectionfailed);
        },
        timeout: 1e4,
      });
  }
}
function requestuncover(n) {
  var t;
  -3 == game.state[n] &&
    (game.populated
      ? uncover(n)
      : (options.disarm && (game.cheated = !0),
        3 == options.gen
          ? ((t = game.x + " " + game.y + " " + game.m + " " + n),
            loader.start(),
            $.ajax({
              type: "POST",
              url: "mbg.cgi",
              data: t,
              success: function (t) {
                var e = t.split("\n");
                if ("OK" != e[0])
                  return (
                    loader.stop(),
                    (nstatus.image.src = "media/status2.png"),
                    void (nstatus.tooltiptext = failedtocreateboard)
                  );
                for (var o = 0; o < e[1].length; o++)
                  for (
                    var a = e[1].charCodeAt(o) - 65,
                      i = 4 * o + 3 < game.f ? 4 * o + 3 : game.f - 1;
                    4 * o <= i;

                  ) {
                    var s = a % 2;
                    (game.field[i] = 1 == s ? -1 : 0), (a >>= 1), i--;
                  }
                CreateField(n), uncover(n), loader.stop();
              },
              error: function () {
                loader.stop(),
                  (nstatus.image.src = "media/status2.png"),
                  (nstatus.tooltiptext = connectionfailed);
              },
              timeout: 1e4,
            }))
          : (CreateField(n), uncover(n))));
}
function muncover(t) {
  if (!(game.state[t] < 0)) {
    for (var e = scoutarea(t), o = 0, a = 0; a < e.length; a++)
      -4 == game.state[e[a]] && o++;
    if (game.state[t] == o)
      for (a = 0; a < e.length; a++)
        if (-3 == game.state[e[a]]) {
          if (!uncover(e[a]) && options.disarm) return;
        }
  }
}
function TNum(t) {
  return Number(t.slice(4));
}
function preload_images() {
  for (var t = 0; t < images_to_preload.length; t++)
    (preloaded_images[t] = new Image()),
      (preloaded_images[t].src = "media/" + images_to_preload[t]);
}
function dim(t, e, o, a) {
  var i = options.zoom;
  return {
    left: t * i + "px",
    top: e * i + "px",
    width: o * i + "px",
    height: a * i + "px",
  };
}
function DrawPlayspace() {
  var t = dim(0, 0, 20 + 16 * game.x, 62 + 16 * game.y);
  (t.left = layout.left + "px"),
    (t.top = layout.top + 44 * options.zoom + "px"),
    $(playspace).css(t),
    $(face.image).css(dim(8 * game.x - 3, 14, 26, 26));
  for (
    var e = [
        [0, 0, 18 + 16 * game.x, 62 + 16 * game.y],
        [8, 8, 2 + 16 * game.x, 36],
        [8, 52, 2 + 16 * game.x, 2 + 16 * game.y],
        [0, 0, 202, 36],
      ],
      o = 0;
    o < 4;
    o++
  ) {
    var a = e[o][0],
      i = e[o][1],
      s = e[o][2],
      n = e[o][3];
    $(ebs[6 * o]).css(dim(a, i + 2, 2, n - 2)),
      $(ebs[6 * o + 2]).css(dim(a + 2, i + n, s - 2, 2)),
      $(ebs[6 * o + 1]).css(dim(a, i, s, 2)),
      $(ebs[6 * o + 3]).css(dim(a + s, i + 2, 2, n)),
      $(ebs[6 * o + 4]).css(dim(a + s, i, 2, 2)),
      $(ebs[6 * o + 5]).css(dim(a, i + n, 2, 2));
  }
  for (o = 0; o < 3; o++) $(digits[o]).css(dim(15 + 13 * o, 15, 13, 23));
  for (o = 3; o < 6; o++)
    $(digits[o]).css(dim(16 * game.x - 73 + 13 * o, 15, 13, 23));
  if (game.x < 8)
    for (o = 0; o < 6; o++) $(digits[o]).css("visibility", "hidden");
  else for (o = 0; o < 6; o++) $(digits[o]).css("visibility", "visible");
  $(board).css(dim(10, 54, 16 * game.x, 16 * game.y));
  for (o = 0; o < game.y; o++)
    for (var l = 0; l < game.x; l++)
      $(tiles[o * game.x + l]).css(dim(16 * l, 16 * o, 16, 16));
  ((t = dim(layout.left, layout.top, 204, 38)).left = layout.left + "px"),
    (t.top = layout.top + "px"),
    $(toolbar).css(t),
    $(zoomin.image).css(dim(6, 6, 26, 26)),
    $(zoomout.image).css(dim(32, 6, 26, 26)),
    $(difficulty.image).css(dim(60, 6, 26, 26)),
    $(generation.image).css(dim(88, 6, 26, 26)),
    $(flipbuttons.image).css(dim(116, 6, 26, 26)),
    $(hint.image).css(dim(144, 6, 26, 26)),
    $(nstatus.image).css(dim(172, 6, 26, 26)),
    $(loading.image).css(dim(173, 7, 24, 24));
  var r =
    $(playspace).offset().left +
    Math.max($(playspace).outerWidth(), $(toolbar).outerWidth()) +
    50;
  $("#rightbar").offset({ left: r, top: 45 });
  var m = $(playspace).offset().top + $(playspace).outerHeight() + 20;
  m - 5 < $("#rightbar").offset().top + $("#rightbar").outerHeight() &&
    $("#footer").outerWidth() + 15 > $("#rightbar").offset().left &&
    (m = $("#rightbar").offset().top + $("#rightbar").outerHeight() + 5),
    $("#footer").offset({ left: 10, top: m }),
    update_video();
}
function setzoom(t) {
  (options.zoom = Math.round(100 * t) / 100), DrawPlayspace();
}
function Icon(t, e, o) {
  (this.image = t),
    (this.pic = e),
    (this.tooltiptext = o),
    (this.timeout = null),
    (this.CancelTooltip = function () {
      clearTimeout(this.timeout), $(tooltip).css({ visibility: "hidden" });
    }),
    (this.DisplayTooltip = function (t) {
      var e = $(t.image).offset(),
        o = $(t.image).height();
      $(tooltip).html(t.tooltiptext),
        $(tooltip).css({
          left: e.left + "px",
          top: e.top + o + 5 + "px",
          visibility: "visible",
        });
    }),
    (this.IconMouseEnter = function (t) {
      t.data.icon.timeout = setTimeout(function () {
        t.data.icon.DisplayTooltip(t.data.icon);
      }, 1e3);
    }),
    (this.IconMouseLeave = function (t) {
      t.data.icon.CancelTooltip();
    }),
    (this.image.src = e),
    $(t).on(
      { mouseenter: this.IconMouseEnter, mouseleave: this.IconMouseLeave },
      { icon: this }
    );
}
function Button(e, t, o, a, i) {
  (this.image = e),
    (this.elevated = t),
    (this.depressed = null == o ? t : o),
    (this.tooltiptext = a),
    (this.timeout = null),
    (this.func = i),
    (this.dep = !1),
    (this.newface = function (t) {
      (this.elevated = t), this.dep || (this.image.src = t);
    }),
    (this.newback = function (t) {
      (this.depressed = t), this.dep && (this.image.src = t);
    }),
    (this.CancelTooltip = function () {
      clearTimeout(this.timeout), $(tooltip).css({ visibility: "hidden" });
    }),
    (this.DisplayTooltip = function (t) {
      var e = $(t.image).offset(),
        o = $(t.image).height();
      $(tooltip).html(t.tooltiptext),
        $(tooltip).css({
          left: e.left + "px",
          top: e.top + o + 5 + "px",
          visibility: "visible",
        });
    }),
    (this.RemoveListeners = function () {
      $(this.image).off();
    }),
    (this.ButtonDetectMouse = function (t) {
      t.data.button.RemoveListeners(),
        $(e).on(
          {
            mousedown: t.data.button.ButtonMouseDown,
            mouseup: t.data.button.ButtonMouseUp,
            mouseenter: t.data.button.ButtonMouseEnter,
            mouseleave: t.data.button.ButtonMouseLeave,
          },
          { button: t.data.button }
        ),
        t.data.button.ButtonMouseEnter(t);
    }),
    (this.ButtonDetectTouch = function (t) {
      t.data.button.RemoveListeners(),
        $(e).on(
          {
            touchstart: t.data.button.ButtonTouchStart,
            touchend: t.data.button.ButtonTouchEnd,
          },
          { button: t.data.button }
        ),
        t.data.button.ButtonTouchStart();
    }),
    (this.ButtonMouseDown = function (t) {
      return (
        1 == t.buttons &&
        ((t.data.button.image.src = t.data.button.depressed),
        !(t.data.button.dep = !0))
      );
    }),
    (this.ButtonMouseUp = function (t) {
      0 == t.button &&
        ((t.data.button.image.src = t.data.button.elevated),
        (t.data.button.dep = !1),
        t.data.button.CancelTooltip(),
        setTimeout(t.data.button.func, 0));
    }),
    (this.ButtonMouseLeave = function (t) {
      t.data.button.CancelTooltip(),
        (t.data.button.image.src = t.data.button.elevated),
        (t.data.button.dep = !1);
    }),
    (this.ButtonMouseEnter = function (t) {
      (t.data.button.timeout = setTimeout(function () {
        t.data.button.DisplayTooltip(t.data.button);
      }, 1e3)),
        1 == t.buttons &&
          ((t.data.button.image.src = t.data.button.depressed),
          (t.data.button.dep = !0));
    }),
    (this.ButtonTouchStart = function (t) {
      (t.data.button.image.src = t.data.button.depressed),
        (t.data.button.dep = !0);
    }),
    (this.ButtonTouchEnd = function (t) {
      (t.data.button.image.src = t.data.button.elevated),
        (t.data.button.dep = !1),
        t.data.button.CancelTooltip(),
        setTimeout(t.data.button.func, 0);
    }),
    (this.image.src = t),
    $(e).on(
      {
        mouseenter: this.ButtonDetectMouse,
        touchstart: this.ButtonDetectTouch,
      },
      { button: this }
    );
}
function UpdateTiles(t) {
  if (null != t)
    for (o = 0; o < t.length; o++) {
      var e = t[o];
      tiles[e].src = "media/t" + game.state[e] + ".png";
    }
  else
    for (var o = 0; o < game.f; o++)
      tiles[o].src = "media/t" + game.state[o] + ".png";
}
function UpdateMinesLeft() {
  $("#mleft").text(game.mleft);
  var t = game.mleft;
  999 < t && (t = 999), t < -99 && (t = -99), t < 0 && (t = -t);
  var e = t % 10,
    o = (t = Math.floor(t / 10)) % 10,
    a = Math.floor(t / 10);
  (digits[0].src = game.mleft < 0 ? "media/d-.png" : "media/d" + a + ".png"),
    (digits[1].src = "media/d" + o + ".png"),
    (digits[2].src = "media/d" + e + ".png");
}
function UpdateTime() {
  var t = game.stopped
      ? Math.floor(game.timeplayed / 1e3)
      : Math.floor((new Date().getTime() - game.timestarted) / 1e3),
    e = t;
  999 < e && (e = 999), e < 0 && (e = 0);
  var o = e % 10,
    a = (e = Math.floor(e / 10)) % 10,
    i = Math.floor(e / 10);
  (digits[3].src = "media/d" + i + ".png"),
    (digits[4].src = "media/d" + a + ".png"),
    (digits[5].src = "media/d" + o + ".png");
  for (
    var s = (t % 60).toString(),
      n = ((t = Math.floor(t / 60)) % 60).toString(),
      l = (t = Math.floor(t / 60)).toString();
    s.length < 2;

  )
    s = "0" + s;
  for (; n.length < 2; ) n = "0" + n;
  var r = n + ":" + s;
  0 < l && (r = l + ":" + r), $("#time").text(r);
}
function depress(t) {
  ClearHint();
  for (var e = 0; e < t.length; e++)
    -3 == game.state[t[e]] &&
      (state.depressed.push(t[e]),
      (tiles[t[e]].src = "media/t0.png"),
      face.newface("media/face1.png"));
}
function elevate() {
  0 != state.depressed.length &&
    (UpdateTiles(state.depressed),
    (state.depressed = []),
    face.newface("media/face0.png"));
}
function isdepressed(t) {
  return 0 <= state.depressed.indexOf(t);
}
function DetectMouse(t) {
  $(board).off(),
    $(board).on({
      mousedown: MouseDown,
      mouseup: MouseUp,
      mousemove: MouseMove,
      mouseleave: MouseLeave,
      mouseenter: MouseEnter,
    }),
    MouseEnter(t);
}
function DetectTouch(t) {
  $(board).off(),
    $(board).on({
      touchstart: TouchStart,
      touchend: TouchEnd,
      tap: Tap,
      taphold: TapHold,
    }),
    TouchStart(t);
}
function MouseDown(t) {
  if (game.stopped) return !1;
  if ("tile" != t.target.id.slice(0, 4)) return !1;
  var e = TNum(t.target.id);
  return (
    ((2 == t.button && !options.flipbuttons) ||
      (0 == t.button && options.flipbuttons)) &&
      3 != (3 & t.buttons) &&
      toggleflag(e),
    ((0 == t.button && !options.flipbuttons) ||
      (2 == t.button && options.flipbuttons)) &&
      3 != (3 & t.buttons) &&
      (t.ctrlKey ? toggleflag(e) : depress([e])),
    (3 != (3 & t.buttons) && 1 != t.button) || depress(scoutarea(e)),
    0 == t.button && 0 < game.state[e] && depress(scoutarea(e)),
    !1
  );
}
function MouseUp(t) {
  var e, o;
  game.stopped ||
    ("tile" == t.target.id.slice(0, 4) &&
      ((e = TNum(t.target.id)),
      (o = t.buttons),
      0 == t.button && (o &= 6),
      1 == t.button && (o &= 3),
      2 == t.button && (o &= 5),
      0 == o &&
        ((0 == t.button && !options.flipbuttons) ||
          (2 == t.button && options.flipbuttons)) &&
        isdepressed(e) &&
        (elevate(), requestuncover(e)),
      (1 == t.button || 0 < o) && (elevate(), muncover(e)),
      0 == t.button && 0 < game.state[e] && (elevate(), muncover(e))));
}
function MouseMove(t) {
  var e;
  game.stopped ||
    "tile" != t.target.id.slice(0, 4) ||
    ((e = TNum(t.target.id)) != state.active &&
      (elevate(),
      (state.active = e),
      ((1 == (1 & t.buttons) && !options.flipbuttons) ||
        (2 == (2 & t.buttons) && options.flipbuttons)) &&
        3 != (3 & t.buttons) &&
        depress([e]),
      (3 != (3 & t.buttons) && 4 != t.buttons) || depress(scoutarea(e)),
      1 == t.buttons && 0 < game.state[e] && depress(scoutarea(e))));
}
function MouseEnter(t) {
  var e;
  game.stopped ||
    ("tile" == t.target.id.slice(0, 4) &&
      ((e = TNum(t.target.id)),
      (state.active = e),
      ((1 == (1 & t.buttons) && !options.flipbuttons) ||
        (2 == (2 & t.buttons) && options.flipbuttons)) &&
        3 != (3 & t.buttons) &&
        depress([e]),
      (3 != (3 & t.buttons) && 1 != t.button) || depress(scoutarea(e))));
}
function MouseLeave(t) {
  game.stopped || ((state.active = null), elevate());
}
function TouchStart(t) {
  var e;
  game.stopped ||
    ("tile" == t.target.id.slice(0, 4) &&
      ((state.processtap = !0),
      (e = TNum(t.target.id)),
      options.flipbuttons || depress([e])));
}
function TouchEnd(t) {
  game.stopped || elevate();
}
function Tap(t) {
  var e;
  state.processtap &&
    (game.stopped ||
      ("tile" == t.target.id.slice(0, 4) &&
        ((e = TNum(t.target.id)),
        face.newface("media/face0.png"),
        (options.flipbuttons ? toggleflag : requestuncover)(e),
        muncover(e))));
}
function TapHold(t) {
  var e;
  (state.processtap = !1),
    game.stopped ||
      ("tile" == t.target.id.slice(0, 4) &&
        ((e = TNum(t.target.id)),
        face.newface("media/face0.png"),
        (options.flipbuttons ? requestuncover : toggleflag)(e)));
}
function ResizeHandler() {
  BeforeDocumentResize(), AfterDocumentResize();
  var t = $("#doptions").get(0),
    e = $(t).height(),
    o = $(t).width(),
    a = $(window).height(),
    i = $(window).width();
  $(t).css({ left: (i - o) / 2, top: Math.max(0, (a - e) / 2) }),
    (t = $("#dstats").get(0)),
    (e = $(t).height()),
    (o = $(t).width()),
    $(t).css({ left: (i - o) / 2, top: Math.max(0, (a - e) / 2) }),
    (t = $("#dhelp").get(0)),
    $(t).css({
      left: i / 10,
      top: a / 10,
      width: (8 * i) / 10,
      height: (8 * a) / 10,
    });
  var s = $("#mlanguages").offset(),
    e = $("#mlanguages").outerHeight();
  $("#menulanguages").offset({ left: s.left - 1, top: s.top + e }),
    (s = $("#mothergames").offset()),
    (e = $("#mothergames").outerHeight()),
    $("#menuothergames").offset({ left: s.left - 1, top: s.top + e });
}
function BeforeDocumentResize() {
  $("#mainmenu").css("width", "90%"),
    $(cover).css({ width: "90%", height: "90%" });
}
function AfterDocumentResize() {
  $("#mainmenu").outerWidth(Math.max($(document).width(), 1100)),
    $(cover).outerWidth($(document).width()),
    $(cover).outerHeight($(document).height());
}
function UpdateCustomDimensions() {
  5 == optionscopy.board
    ? ($("#scw,#sch,#scm").prop("disabled", !1),
      $("#scw").val(optionscopy.w),
      $("#sch").val(optionscopy.h),
      $("#scm").val(optionscopy.m))
    : ($("#scw,#sch,#scm").prop("disabled", !0),
      $("#scw").val(boarddims[optionscopy.board][0]),
      $("#sch").val(boarddims[optionscopy.board][1]),
      $("#scm").val(boarddims[optionscopy.board][2]));
}
function UpdateOptionsWindow() {
  (optionscopy = $.extend({}, options)),
    $("#szoom").val(Math.round(100 * optionscopy.zoom)),
    $("[id^=tbs]").css("color", "#CCC"),
    $("#tbs" + optionscopy.board).css("color", "black"),
    UpdateCustomDimensions(),
    $("[id^=tbg]").css("color", "#CCC"),
    $("#tbg" + optionscopy.gen).css("color", "black"),
    $("#tooq").css("color", optionscopy.qmark ? "black" : "#CCC"),
    $("#toof").css("color", optionscopy.flipbuttons ? "black" : "#CCC"),
    $("#tood").css("color", optionscopy.disarm ? "black" : "#CCC");
}
function ValidateCustomDims() {
  var t = Math.round(Number($("#scw").val())),
    e = Math.round(Number($("#sch").val())),
    o = Math.round(Number($("#scm").val()));
  isNaN(t) && (t = optionscopy.w),
    isNaN(e) && (e = optionscopy.h),
    isNaN(o) && (o = optionscopy.m),
    t < 3 && (t = 3),
    e < 3 && (e = 3),
    o < 0 && (o = 0),
    t * e - 9 < o && (o = t * e - 9),
    (optionscopy.w = t),
    (optionscopy.h = e),
    (optionscopy.m = o),
    $("#scw").val(t),
    $("#sch").val(e),
    $("#scm").val(o);
}
function ValidateZoom() {
  var t = Math.round(Number($("#szoom").val()));
  (isNaN(t) || t <= 0) && (t = Math.round(100 * optionscopy.zoom)),
    (optionscopy.zoom = t / 100),
    $("#szoom").val(t);
}
function UpdateToolbar() {
  difficulty.newface("media/diff" + 2 * options.board + ".png"),
    difficulty.newback("media/diff" + (2 * options.board + 1) + ".png"),
    (difficulty.tooltiptext = currentdiff + difficulties[options.board]),
    generation.newface("media/gen" + (2 * options.gen - 2) + ".png"),
    generation.newback("media/gen" + (2 * options.gen - 1) + ".png"),
    (generation.tooltiptext = boardgen),
    1 == options.gen && (generation.tooltiptext += fullyrandom),
    2 == options.gen && (generation.tooltiptext += firstbetsafe),
    3 == options.gen && (generation.tooltiptext += pureintellect),
    options.flipbuttons
      ? (flipbuttons.newface("media/flip2.png"),
        flipbuttons.newback("media/flip3.png"),
        (flipbuttons.tooltiptext = tapflag))
      : (flipbuttons.newface("media/flip0.png"),
        flipbuttons.newback("media/flip1.png"),
        (flipbuttons.tooltiptext = taptile));
}
function SetStatsFlags() {
  for (var t = 0; t < 4; t++) statsdlg[0][t] = !1;
  for (t = 0; t < 6; t++) statsdlg[1][t] = !1;
  game.cheated ? (statsdlg[0][3] = !0) : (statsdlg[0][options.gen - 1] = !0),
    (statsdlg[1][options.board] = !0);
}
function StatsFlagsToTick() {
  for (var t = 0; t < 4; t++)
    $("#tssgt" + t).css("color", statsdlg[0][t] ? "black" : "#CCC");
  for (t = 0; t < 6; t++)
    $("#tssbs" + t).css("color", statsdlg[1][t] ? "black" : "#CCC");
}
function FormatAsTime(t) {
  for (var e = Math.round(t / 1e3), o = (e % 60).toString(); o.length < 2; )
    o = "0" + o;
  for (var a = ((e = Math.floor(e / 60)) % 60).toString(); a.length < 2; )
    a = "0" + a;
  for (var i = ((e = Math.floor(e / 60)) % 24).toString(); i.length < 2; )
    i = "0" + i;
  return (0 < (e = Math.floor(e / 24)) ? e + ":" : "") + i + ":" + a + ":" + o;
}
function CalculateStats() {
  for (
    var t = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      e = [null, null],
      o = "-",
      a = 0;
    a < 4;
    a++
  )
    for (var i = 0; i < 6; i++)
      if (statsdlg[0][a] && statsdlg[1][i]) {
        for (var s = 0; s < 3; s++) t[0][s] += stats[a][i][1][s];
        for (s = 0; s < 3; s++) t[1][s] += stats[a][i][2][s];
        for (s = 0; s < 3; s++) t[2][s] += stats[a][i][0][s];
        null != stats[a][i][3][0] &&
          (null == e[0] || e[0] > stats[a][i][3][0]) &&
          ((e[0] = stats[a][i][3][0]), (e[1] = stats[a][i][3][1]));
      }
  for (a = 0; a < 3; a++) for (i = 0; i < 3; i++) t[3][a] += t[i][a];
  0 < t[3][0] && (o = Math.round((1e4 * t[0][0]) / t[3][0]) / 100 + "%");
  for (a = 0; a < 4; a++) $("#stat-0-" + a).text(t[a][0]);
  for (a = 0; a < 4; a++) $("#stat-1-" + a).text(FormatAsTime(t[a][1]));
  for (a = 0; a < 4; a++) $("#stat-2-" + a).text(t[a][2]);
  $("#stat-3-0").text(o),
    $("#stat-3-1").text(null == e[0] ? "-" : Math.floor(e[0] / 10) / 100),
    $("#stat-3-2").text(
      null == e[1] ? "-" : new Date(e[1]).toLocaleDateString()
    );
}
function hidemenuboxes() {
  $("#menulanguages").css("visibility", "hidden"),
    (visible.mlanguages = !1),
    $("#menuothergames").css("visibility", "hidden"),
    (visible.mothergames = !1);
}
function rep_con() {
  gtag_report_conversion(),
    gtag("event", "1minute"),
    setTimeout(function () {
      rep_con();
    }, 6e4);
}
function update_video() {
  var t = "";
  switch (options.board) {
    case 1:
      t =
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/LFECjSinhp0?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      break;
    case 2:
      t =
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/IEppdi2LDmo?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      break;
    case 3:
      t =
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/SLN6N_XRpiE?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      break;
    case 4:
      t =
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/k7R0mklYuGI?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      break;
    default:
      t =
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/9LAfO9-FTZY?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
  }
  $("#ytvid").html(t);
}
preload_images(),
  (function (i) {
    i.fn.nodoubletapzoom = function () {
      i(this).bind("touchstart", function (t) {
        var e = t.timeStamp,
          o = e - (i(this).data("lastTouch") || e),
          a = t.originalEvent.touches.length;
        i(this).data("lastTouch", e),
          !o ||
            500 < o ||
            1 < a ||
            (t.preventDefault(), i(this).trigger("click").trigger("click"));
      });
    };
  })(jQuery),
  $(function () {
    var t,
      e = localStorage.getItem("options");
    null !== e &&
      ((options = JSON.parse(e)),
      null !== (t = localStorage.getItem("game")) && (game = JSON.parse(t)));
    var o = localStorage.getItem("stats");
    null !== o && (stats = JSON.parse(o)),
      (playspace = $("#playspace").get(0)),
      $(playspace).nodoubletapzoom(),
      (board = $("#board").get(0)),
      (toolbar = $("#toolbar").get(0)),
      (tooltip = $("#tooltip").get(0)),
      (cover = $("#cover").get(0));
    for (var a = 0; a < 24; a++) ebs.push($("#eb" + a).get(0));
    for (a = 0; a < 6; a++) digits.push($("#dd" + a).get(0));
    (face = new Button(
      $("#face").get(0),
      "media/face0.png",
      "media/face4.png",
      newgame,
      function () {
        0 == game.outcome && SaveStats(), NewGame();
      }
    )),
      (zoomin = new Button(
        $("#zoomin").get(0),
        "media/zoomin0.png",
        "media/zoomin1.png",
        zoominp,
        function () {
          setzoom(1.1 * options.zoom);
        }
      )),
      (zoomout = new Button(
        $("#zoomout").get(0),
        "media/zoomout0.png",
        "media/zoomout1.png",
        zoomoutp,
        function () {
          setzoom(options.zoom / 1.1);
        }
      )),
      (difficulty = new Button(
        $("#difficulty").get(0),
        "media/diff0.png",
        "media/diff1.png",
        currentdiff + difficulties[0],
        function () {
          SaveStats(),
            options.board++,
            5 < options.board && (options.board = 0),
            difficulty.newface("media/diff" + 2 * options.board + ".png"),
            difficulty.newback("media/diff" + (2 * options.board + 1) + ".png"),
            (difficulty.tooltiptext =
              currentdiff + difficulties[options.board]),
            BeforeDocumentResize(),
            CreateBoard(),
            DrawPlayspace(),
            NewGame(),
            AfterDocumentResize();
        }
      )),
      (generation = new Button(
        $("#generation").get(0),
        "media/gen4.png",
        "media/gen5.png",
        boardgen + pureintellect,
        function () {
          SaveStats(),
            options.gen++,
            3 < options.gen && (options.gen = 1),
            generation.newface("media/gen" + (2 * options.gen - 2) + ".png"),
            generation.newback("media/gen" + (2 * options.gen - 1) + ".png"),
            (generation.tooltiptext = boardgen),
            1 == options.gen && (generation.tooltiptext += fullyrandom),
            2 == options.gen && (generation.tooltiptext += firstbetsafe),
            3 == options.gen && (generation.tooltiptext += pureintellect),
            NewGame();
        }
      )),
      (flipbuttons = new Button(
        $("#flipbuttons").get(0),
        "media/flip0.png",
        "media/flip1.png",
        taptile,
        function () {
          (options.flipbuttons = !options.flipbuttons),
            options.flipbuttons
              ? (flipbuttons.newface("media/flip2.png"),
                flipbuttons.newback("media/flip3.png"),
                (flipbuttons.tooltiptext = tapflag))
              : (flipbuttons.newface("media/flip0.png"),
                flipbuttons.newback("media/flip1.png"),
                (flipbuttons.tooltiptext = taptile));
        }
      )),
      (hint = new Button(
        $("#hint").get(0),
        "media/hint0.png",
        "media/hint1.png",
        requesthintp,
        requesthint
      )),
      (nstatus = new Icon(
        $("#nstatus").get(0),
        "media/status1.png",
        everythingseemsok
      )),
      (loading = new Icon(
        $("#loading").get(0),
        "media/loading.gif",
        loadingpleasewait
      )),
      $("#fbstatic").html(fbpage),
      ResizeHandler(),
      BeforeDocumentResize(),
      CreateBoard(),
      DrawPlayspace(),
      (game.populated ? LoadGame : NewGame)(),
      AfterDocumentResize(),
      UpdateToolbar(),
      (playspace.oncontextmenu = function () {
        return !1;
      }),
      $(board).on({ mouseenter: DetectMouse, touchstart: DetectTouch }),
      $(document).keypress(function (t) {
        var e = t.which || t.keyCode;
        if (43 == e) return setzoom(1.1 * options.zoom), !1;
        if (45 == e) return setzoom(options.zoom / 1.1), !1;
        if ((32 != e && 13 != e) || null == state.active)
          return (
            32 != e &&
            (104 == e ? (requesthint(), !1) : 99 == e ? (cheat(), !1) : void 0)
          );
        var o = game.state[state.active];
        return (
          -3 == o && 13 == e
            ? requestuncover(state.active)
            : (-3 != o && -4 != o && -6 != o) || toggleflag(state.active),
          0 < o && muncover(state.active),
          !1
        );
      }),
      $(document).keydown(function (t) {
        var e = t.which || t.keyCode;
        if (113 == e) return SaveStats(), NewGame(), !1;
        27 == e &&
          (hidemenuboxes(),
          visible.options &&
            ($("#doptions").css("visibility", "hidden"),
            $(cover).css("visibility", "hidden"),
            (visible.options = !1)),
          visible.stats &&
            ($("#dstats").css("visibility", "hidden"),
            $(cover).css("visibility", "hidden"),
            (visible.stats = !1)),
          visible.help &&
            ($("#fblpchelp").html(""),
            $("#dhelp").css("visibility", "hidden"),
            $(cover).css("visibility", "hidden"),
            (visible.help = !1)));
      }),
      $("#mnewgame").click(function () {
        hidemenuboxes(), SaveStats(), NewGame();
      }),
      $("#moptions").click(function () {
        hidemenuboxes(),
          UpdateOptionsWindow(),
          $(cover).css("visibility", "visible"),
          $("#doptions").css("visibility", "visible"),
          (visible.options = !0);
      }),
      $("#scw,#sch,#scm").blur(ValidateCustomDims),
      $("[id^=sbs]").click(function (t) {
        $("[id^=tbs]").css("color", "#CCC");
        var e = t.target.id.slice(-1);
        $("#tbs" + e).css("color", "black"),
          (optionscopy.board = Number(e)),
          UpdateCustomDimensions();
      }),
      $("[id^=sbg]").click(function (t) {
        $("[id^=tbg]").css("color", "#CCC");
        var e = t.target.id.slice(-1);
        $("#tbg" + e).css("color", "black"), (optionscopy.gen = Number(e));
      }),
      $("[id^=soo]").click(function (t) {
        var e,
          o = t.target.id.slice(-1);
        switch (o) {
          case "q":
            e = optionscopy.qmark = !optionscopy.qmark;
            break;
          case "f":
            e = optionscopy.flipbuttons = !optionscopy.flipbuttons;
            break;
          case "d":
            e = optionscopy.disarm = !optionscopy.disarm;
        }
        $("#too" + o).css("color", e ? "black" : "#CCC");
      }),
      $("#szoom").blur(ValidateZoom),
      $("#bcoptions").click(function () {
        $(cover).css("visibility", "hidden"),
          $("#doptions").css("visibility", "hidden"),
          (visible.options = !1);
      }),
      $("#booptions").click(function () {
        $(cover).css("visibility", "hidden"),
          $("#doptions").css("visibility", "hidden"),
          (visible.options = !1),
          options.zoom != optionscopy.zoom && setzoom(optionscopy.zoom);
        var t = !1,
          e = !1;
        options.board != optionscopy.board && (t = e = !0),
          5 != optionscopy.board ||
            (optionscopy.w == options.w &&
              optionscopy.h == options.h &&
              optionscopy.m == options.m) ||
            (t = e = !0),
          optionscopy.gen != options.gen && (t = !0),
          optionscopy.disarm && game.populated && (game.cheated = !0),
          t && SaveStats(),
          (options = {}),
          (options = $.extend({}, optionscopy)),
          e && (BeforeDocumentResize(), CreateBoard(), DrawPlayspace()),
          t && NewGame(),
          e && AfterDocumentResize(),
          UpdateToolbar();
      }),
      $("#mstatistics").click(function () {
        hidemenuboxes(),
          SetStatsFlags(),
          StatsFlagsToTick(),
          CalculateStats(),
          ResizeHandler(),
          $(cover).css("visibility", "visible"),
          $("#dstats").css("visibility", "visible"),
          (visible.stats = !0);
      }),
      $("#bcstats").click(function () {
        $(cover).css("visibility", "hidden"),
          $("#dstats").css("visibility", "hidden"),
          (visible.stats = !1);
      }),
      $("[id^=sssgt]").click(function (t) {
        var e = t.target.id.slice(-1);
        (statsdlg[0][e] = !statsdlg[0][e]),
          StatsFlagsToTick(),
          CalculateStats();
      }),
      $("[id^=sssbs]").click(function (t) {
        var e = t.target.id.slice(-1);
        (statsdlg[1][e] = !statsdlg[1][e]),
          StatsFlagsToTick(),
          CalculateStats();
      }),
      $("#brstats").click(function () {
        for (var t = 0; t < 4; t++)
          for (var e = 0; e < 6; e++)
            statsdlg[0][t] &&
              statsdlg[1][e] &&
              (stats[t][e] = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [null, null],
              ]);
        CalculateStats();
      }),
      $("#mhelp").click(function () {
        hidemenuboxes(),
          $(cover).css("visibility", "visible"),
          $("#dhelp").css("visibility", "visible"),
          (visible.help = !0),
          $("#fblpchelp").html(fbpage),
          FB.XFBML.parse();
      }),
      $("#bchelp").click(function () {
        $("#fblpchelp").html(""),
          $(cover).css("visibility", "hidden"),
          $("#dhelp").css("visibility", "hidden"),
          (visible.help = !1);
      }),
      $("#mlanguages").click(function () {
        visible.mlanguages
          ? hidemenuboxes()
          : (hidemenuboxes(),
            $("#menulanguages").css("visibility", "visible"),
            (visible.mlanguages = !0));
      }),
      $("#mothergames").click(function () {
        visible.mothergames
          ? hidemenuboxes()
          : (hidemenuboxes(),
            $("#menuothergames").css("visibility", "visible"),
            (visible.mothergames = !0));
      }),
      $(window).click(function (t) {
        var e = !0;
        "mmi" == t.target.className && (e = !1),
          "ddmenu" == t.target.className && (e = !1),
          "ddmi" == t.target.className && (e = !1),
          e && hidemenuboxes();
      }),
      $(window).resize(ResizeHandler),
      $(window).on("beforeunload", function () {
        localStorage.setItem("options", JSON.stringify(options)),
          game.populated
            ? (game.stopped ||
                (game.timeplayed = new Date().getTime() - game.timestarted),
              localStorage.setItem("game", JSON.stringify(game)))
            : localStorage.removeItem("game"),
          localStorage.setItem("stats", JSON.stringify(stats)),
          gtag("event", "unload");
      }),
      setTimeout(function () {
        rep_con();
      }, 6e4);
    setTimeout(function () {
      var ftop = $(playspace).offset().top + $(playspace).outerHeight() + 20;
      if (
        ftop - 5 < $("#rightbar").offset().top + $("#rightbar").outerHeight() &&
        $("#footer").outerWidth() + 15 > $("#rightbar").offset().left
      )
        ftop = $("#rightbar").offset().top + $("#rightbar").outerHeight() + 5;
      $("#footer").offset({ left: 10, top: ftop });
    }, 1000);
  });
