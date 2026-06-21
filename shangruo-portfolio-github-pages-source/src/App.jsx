import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "《间客》AI 化制作",
    role: "主导导演 / AI 影像流程",
    date: "2026",
    tag: "AIGC Series",
    description:
      "主导第一集 AI 化制作流程，负责镜头拆解、AI 生成方案、角色一致性、画面返修、质量审核及团队执行推进。",
    metrics: ["角色一致性", "镜头返修", "质量审核"],
  },
  {
    title: "《超能复刻镜》PV",
    role: "导演",
    date: "2026",
    tag: "PV Direction",
    description:
      "负责 PV 视觉方向、镜头节奏、AI 画面生成与成片推进，统筹分镜、生成、返修及剪辑衔接。",
    metrics: ["视觉方向", "成片推进", "剪辑衔接"],
  },
  {
    title: "永生5 AI：重构 CG Pipeline",
    role: "AI Pipeline / CG 流程重构",
    date: "2025",
    tag: "Pipeline Rebuild",
    description:
      "围绕永生5项目，把原本分散的 AI 出图、镜头拆解、CG 补强、返修反馈和剪辑交付重新整理成可执行流程，让 AI 从单点工具变成能参与生产的流水线。",
    metrics: ["AI 流程重构", "镜头资产拆解", "CG Pipeline"],
    flow: ["脚本拆解", "镜头任务", "AI 生成", "CG 补强", "返修交付"],
  },
  {
    title: "《LUNA》AI 概念短片",
    role: "AIGC 制图分镜师",
    date: "2025",
    tag: "AI Short Film",
    description:
      "负责地铁段落视觉与镜头设计，独立产出片头前 30 秒核心镜头序列，项目上线后获得 3 万+ 播放量。",
    metrics: ["30s 核心镜头", "3 万+ 播放", "叙事验证"],
  },
];

const strengths = [
  {
    title: "传统影像流程",
    text: "理解剧本拆解、分镜设计、镜头调度、动画制作、剪辑合成和成片交付，能从导演视角判断画面是否成立。",
    tags: ["剧本拆解", "分镜", "剪辑", "成片判断"],
  },
  {
    title: "AI 影像 Pipeline",
    text: "能把 AIGC 从单点生成整理成可执行流程，覆盖角色一致性、镜头生成、CG 补强、返修反馈和质量审核。",
    tags: ["AIGC", "角色一致性", "返修管理", "质量审核"],
  },
  {
    title: "Web Coding",
    text: "具备 React / Vite 前端搭建能力，可以从零做作品集、产品 Demo、交互页面和可运行的视觉展示系统。",
    tags: ["React", "Vite", "交互动效", "作品集网站"],
  },
  {
    title: "Skill 与自动化",
    text: "能把重复流程沉淀成提示词、Skill、脚本和自动化工作流，用工具把创意生产中的琐碎环节系统化。",
    tags: ["Skill", "自动化", "脚本流程", "提示词系统"],
  },
  {
    title: "技术导演能力",
    text: "能连接创意需求、技术路径和团队执行，把抽象方向拆成任务、资产、版本和交付标准。",
    tags: ["任务拆分", "Pipeline 设计", "版本管理", "交付标准"],
  },
  {
    title: "创意型导演表达",
    text: "同时具备世界观、人物气质、影像情绪和品牌视觉的组织能力，不只会做工具，也能判断审美和叙事方向。",
    tags: ["世界观", "人物气质", "视觉叙事", "品牌感"],
  },
];

const heroStats = [
  ["5Y", "Creative Practice"],
  ["AIGC", "Film Pipeline"],
  ["3W+", "LUNA Views"],
];

const ipWorks = [
  {
    slug: "youjie-series",
    title: "幽界之门系列",
    type: "Dual Universe IP",
    keywords: ["双宇宙", "废土末世", "JRPG 奇幻", "神明已死"],
    logline:
      "一个由两个宇宙构成的原创影像系列：其一是神明已死后的废土末世，其二是围绕异界之门展开的奇幻 JRPG 冒险。",
    description:
      "幽界之门系列分为两个世界观方向：`幽界` 讲述神明已死后，信仰、秩序和文明残骸如何在废土中继续腐烂与重组；`幽界之门` 则是奇幻 JRPG 题材，围绕异界之门、冒险小队、神秘遗迹与命运召唤展开。",
    heroImage: "/assets/youjie-series/youjie-world.webp",
    gallery: [
      {
        title: "废墟城镇",
        text: "凝固的城镇、旧神阴影与停摆时间，是幽界世界观的入口。",
        image: "/assets/youjie-series/youjie-world.webp",
      },
      {
        title: "角色群像",
        text: "用于承载荒原商队、旧秩序骑士和幸存者阵营的视觉资产。",
        image: "/assets/youjie-series/youjie-cast.webp",
      },
      {
        title: "Fate Revolved",
        text: "幽界之门分支里的奇幻决斗短片，用塔罗结构组织命运对决。",
        image: "/assets/youjie-series/gate-frey.webp",
      },
    ],
    process: ["世界观归档", "角色资产", "视觉 KV", "AI 视频预览", "项目中台"],
    children: [
      {
        slug: "youjie",
        title: "幽界",
        type: "Dead Gods Wasteland",
        keywords: ["神明已死", "废土末世", "文明残骸", "荒原秩序"],
        logline:
          "神明死去之后，世界没有迎来解放，只剩下被信仰、饥荒、机械遗迹和旧日战争撕裂的荒原。",
        description:
          "幽界是一个神明已死的废土末世宇宙。人类在破碎城邦、荒原商队、残存教团和异化遗迹之间求生，旧神遗体成为资源、诅咒与权力的来源。它更偏沉重、粗粝、荒凉，适合发展成长篇世界观、阵营设定、角色群像和末世公路式影像。",
        heroImage: "/assets/youjie-series/youjie-world.webp",
        gallery: [
          {
            title: "废墟城镇",
            text: "灰烬、门、残存建筑和竖向光束，建立神明死后的废土秩序。",
            image: "/assets/youjie-series/youjie-world.webp",
          },
          {
            title: "荒原角色组",
            text: "适合作为城邦、商队、旧教团和废土幸存者阵营的视觉基础。",
            image: "/assets/youjie-series/youjie-cast.webp",
          },
        ],
        process: ["神明背叛", "时间停摆", "蓝花复苏", "废土城邦"],
      },
      {
        slug: "youjie-gate",
        title: "幽界之门",
        type: "Fantasy JRPG Adventure",
        keywords: ["奇幻 JRPG", "异界之门", "冒险小队", "命运召唤"],
        logline:
          "一扇连接幽界的门被意外开启，少年与失落的冒险小队被卷入古老契约，踏上穿越遗迹与城邦的旅程。",
        description:
          "幽界之门是奇幻 JRPG 题材影像项目，强调冒险感、队伍关系、遗迹探索、召唤仪式与成长叙事。当前素材包中整合了 Fate Revolved 分支：以少年魔剑士、退场骑士、表演赛系统和塔罗命运结构，验证这个宇宙可以承载角色驱动的奇幻短片。",
        heroImage: "/assets/youjie-series/gate-frey.webp",
        video: "/assets/youjie-series/gate-duel-preview.mp4",
        gallery: [
          {
            title: "弗瑞 FREY",
            text: "少年魔剑士，被时代推上位的传奇上升者。",
            image: "/assets/youjie-series/gate-frey.webp",
          },
          {
            title: "退场骑士",
            text: "末路骑士、赎罪者，也是主角命运的镜像。",
            image: "/assets/youjie-series/gate-knight.webp",
          },
          {
            title: "塔罗结构",
            text: "用命运之轮、愚人、倒吊人和恶魔等牌面组织叙事隐喻。",
            image: "/assets/youjie-series/gate-tarot.webp",
          },
          {
            title: "系统之手",
            text: "战斗被包装为表演资产，胜负和死亡都被资本定价。",
            image: "/assets/youjie-series/gate-system.webp",
          },
        ],
        process: ["奇幻决斗", "塔罗叙事", "角色设定", "AI 动态预览"],
      },
    ],
  },
  {
    slug: "yiyu",
    title: "忆豫行",
    type: "Philosophical Art Film",
    keywords: ["个体对抗", "集体环境", "平庸主义", "哲学文艺"],
    logline:
      "一个个体在集体环境的惯性、规训和沉默中寻找自我边界，试图对抗平庸主义对生活与精神的吞没。",
    description:
      "忆豫行是哲学题材文艺片，讲述个体与集体环境对抗的故事。它关注人在地方、家庭、制度、舆论和日常秩序中的被塑造感，以及一个人如何拒绝被平庸主义消解。影像上适合以克制调度、现实街景、旁白、长镜头和记忆碎片形成个人表达。",
  },
  {
    slug: "huanmeng",
    title: "幻梦",
    type: "Cyberpunk Series",
    keywords: ["系列 IP", "赛博朋克", "意识迷宫", "AI 记忆"],
    logline:
      "在霓虹覆盖的未来城市里，人类梦境被算法回收再售卖，主角在一次记忆事故后发现自己的身份也可能只是被生成的幻梦。",
    description:
      "幻梦是一个系列 IP，以赛博朋克城市、意识迷宫、身份裂变和 AI 记忆为核心。它可以由多个单元故事组成，每一集围绕不同角色的梦境、记忆交易或身份事故展开，适合发展成系列短片、MV、视觉概念集和世界观档案。",
  },
];

const filmCategories = [
  {
    key: "featured",
    title: "精品短片",
    description: "已经进入作品集主展示位的个人短片与概念短片。",
  },
  {
    key: "mv-ad",
    title: "MV / 广告类",
    description: "围绕音乐节奏、品牌气质和视觉包装展开的短片。",
  },
  {
    key: "commercial-animation",
    title: "商业动画短片",
    description: "商业动画、项目中台、角色篇章与系列化短片方向。",
  },
  {
    key: "unshot",
    title: "来不及拍的片",
    description: "暂未拍摄但已经形成概念、片名或视觉方向的片单。",
  },
  {
    key: "notes",
    title: "随记短片",
    description: "记录灵感、生活切片、视觉实验和即时创作的轻量影像。",
  },
];

const filmWorks = [
  {
    title: "娜莉塔 MV",
    category: "mv-ad",
    year: "2025",
    tag: "Music Video",
    description: "围绕娜莉塔角色气质展开的 MV 影像方案，用音乐节奏、人物特写和舞台化光影建立角色记忆点。",
    details: ["娜莉塔", "AI 桌宠", "角色 MV", "粉白黑蓝"],
    poster: "/assets/nalita-mv/nalita-mv-poster.webp",
    video: "/assets/nalita-mv/nalita-mv.mp4",
    wallpaper: "radial-gradient(circle at 72% 48%, rgba(255, 166, 190, 0.34), transparent 22%), radial-gradient(circle at 36% 40%, rgba(88, 199, 255, 0.22), transparent 20%), linear-gradient(120deg, #07050d 0%, #241528 48%, #070707 100%)",
  },
  {
    title: "楼兰不归客",
    category: "featured",
    year: "2026",
    tag: "Selected Short",
    description: "个人精品短片主展示位，后续可替换为正式海报、剧照或视频入口。",
    wallpaper: "radial-gradient(circle at 70% 34%, rgba(255, 210, 156, 0.32), transparent 22%), radial-gradient(circle at 42% 64%, rgba(200, 255, 26, 0.16), transparent 20%), linear-gradient(120deg, #0b0d10 0%, #263024 48%, #070707 100%)",
  },
  {
    title: "one nice day",
    category: "mv-ad",
    year: "2026",
    tag: "AIGC MV / Youth Band",
    description: "一间即将被关闭的校园社团 B-17，被四个失意少年用音乐点燃，最终在现实崩塌中升空重构为东京巨蛋。",
    details: ["B-17 音乐社", "莲 / Frey", "彻 / 瞬 / 晴", "东京巨蛋幻想"],
    poster: "/assets/onesd/one-nice-day-kv.webp",
    video: "/assets/onesd/one-nice-day.mp4",
    wallpaper: "radial-gradient(circle at 72% 38%, rgba(255, 210, 156, 0.34), transparent 22%), linear-gradient(120deg, #081018 0%, #183241 48%, #0b0c0d 100%)",
  },
  {
    title: "沸腾 Scald",
    category: "commercial-animation",
    year: "2026",
    tag: "Project Hub",
    description: "商业动画短片项目中台入口，可承载项目流程、角色、镜头与版本管理展示。",
    video: "/assets/scald/scald-bg.mp4",
    wallpaper: "radial-gradient(circle at 70% 42%, rgba(255, 83, 62, 0.45), transparent 24%), linear-gradient(135deg, #120706 0%, #33100d 45%, #060709 100%)",
  },
  {
    title: "叶凡篇",
    category: "commercial-animation",
    year: "2026",
    tag: "Character Episode",
    description: "商业动画角色篇章占位，后续可加入角色设定、关键帧和片段。",
    wallpaper: "radial-gradient(circle at 62% 36%, rgba(88, 199, 255, 0.36), transparent 22%), linear-gradient(130deg, #050915 0%, #182b44 48%, #060707 100%)",
  },
  {
    title: "乔玛丽",
    category: "commercial-animation",
    year: "2026",
    tag: "Character Episode",
    description: "商业动画角色篇章占位，适合后续补充人物海报、镜头测试和成片入口。",
    wallpaper: "radial-gradient(circle at 70% 42%, rgba(170, 126, 255, 0.36), transparent 24%), linear-gradient(135deg, #0b0813 0%, #21173d 48%, #070707 100%)",
  },
  {
    title: "月光下博尔赫斯",
    category: "unshot",
    year: "Concept",
    tag: "Unshot Idea",
    description: "来不及拍的片单概念位，适合放置文本、视觉参考和未来开发方向。",
    wallpaper: "radial-gradient(circle at 68% 35%, rgba(215, 229, 255, 0.28), transparent 20%), linear-gradient(130deg, #060914 0%, #1b2534 46%, #050607 100%)",
  },
  {
    title: "荒诞主义",
    category: "unshot",
    year: "Concept",
    tag: "Unshot Idea",
    description: "未拍摄概念短片，占位用于后续补充故事梗概、视觉方案或分镜草案。",
    wallpaper: "radial-gradient(circle at 72% 48%, rgba(200, 255, 26, 0.26), transparent 22%), linear-gradient(120deg, #080d08 0%, #1c2218 48%, #070707 100%)",
  },
  {
    title: "CyberPK 赛博朋克概念片",
    category: "featured",
    year: "2025",
    tag: "Cyberpunk Concept",
    description: "赛博朋克方向的原创概念短片，用霓虹城市、意识迷宫和低成本 AI+CG 流程验证视觉叙事可能性。",
    wallpaper: "radial-gradient(circle at 68% 35%, rgba(88, 199, 255, 0.34), transparent 20%), radial-gradient(circle at 42% 66%, rgba(255, 82, 146, 0.24), transparent 24%), linear-gradient(130deg, #050814 0%, #171f3a 46%, #060707 100%)",
  },
];

const nalitaProduct = {
  slug: "nalita",
  name: "NALITA",
  cnName: "娜莉塔",
  type: "AI Executive Director Desktop Companion",
  logline:
    "一个为执行导演设计的 AI 辅助桌宠：陪伴创作现场，整理镜头任务，追踪返修反馈，并把混乱灵感压缩成可执行方案。",
  abilities: [
    "剧本拆解与镜头任务提醒",
    "分镜、返修、版本反馈整理",
    "AI 影像生成提示词辅助",
    "项目节奏与交付节点陪跑",
  ],
  mjPrompt:
    "Use the provided character reference images as the identity reference for NALITA. Create a premium CG live-action full-body cover art photograph for a website background page. NALITA is an AI executive director desktop companion, elegant humanoid female assistant with long soft pink hair, clear luminous blue eyes, porcelain skin, refined gothic qipao dress in white, pale pink and black, black lace gloves, rose embroidery, black lace trim, high-fashion gothic Chinese dress silhouette, no headpiece, no horns, no crown. Pose her as a full-body character showcase, either sitting gracefully on a futuristic filmmaker's desk or reclining elegantly beside holographic film monitors, one leg extended naturally, calm intelligent expression, sophisticated and slightly mysterious, not childish, not toy-like. Surround her with subtle floating UI: shot list, storyboard thumbnails, revision notes, prompt assistant panels, tiny holographic clapperboard, timeline interface. Background: dark luxury creative studio, cinematic director workspace, glass screens, soft blue eye-color accents, pink-white-black palette with restrained cyan blue highlights, premium product cover photography, elegant composition with negative space for website typography, cinematic rim light, soft volumetric light, shallow depth of field, ultra detailed fabric, lace, embroidery, realistic skin, high-end CG realism, editorial fashion photography, Unreal Engine cinematic render, Octane render quality --ar 16:9 --v 6 --style raw",
};

function FilmShowcase() {
  const [activeFilm, setActiveFilm] = useState(filmWorks[0]);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const sectionRef = useRef(null);
  const stripRef = useRef(null);
  const scrollRafRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoReady(entry.isIntersecting);
      },
      { rootMargin: "260px 0px", threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollFilmStrip = (direction) => {
    stripRef.current?.scrollBy({ left: direction * 420, behavior: "smooth" });
  };

  const syncActiveFilmFromScroll = () => {
    const strip = stripRef.current;
    if (!strip) return;
    if (scrollRafRef.current) return;

    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = 0;
      const center = strip.scrollLeft + strip.clientWidth / 2;
      const tiles = Array.from(strip.querySelectorAll(".film-tile"));
      const nextIndex = tiles.reduce(
        (best, tile, index) => {
          const tileCenter = tile.offsetLeft + tile.offsetWidth / 2;
          const distance = Math.abs(tileCenter - center);
          return distance < best.distance ? { index, distance } : best;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY }
      ).index;
      const nextFilm = filmWorks[nextIndex] || filmWorks[0];
      setActiveFilm((current) => (current.title === nextFilm.title ? current : nextFilm));
    });
  };

  return (
    <section id="films" className="film-showcase" ref={sectionRef}>
      <div className="film-wallpaper" style={{ background: activeFilm.wallpaper }} />
      {activeFilm.video && isVideoReady ? (
        <video
          className="film-wallpaper-video"
          key={activeFilm.video}
          src={activeFilm.video}
          poster={activeFilm.poster}
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : null}
      <div className="film-wallpaper-noise" />
      <div className="film-drift" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="film-play-mark" aria-hidden="true">
        <span />
      </div>
      <div className="section-head film-heading">
        <span className="section-bg-title">FILMS</span>
        <p className="section-code">04 / Short Film Collection</p>
        <h2>个人精品短片合集</h2>
      </div>
      <div className="film-hero-copy">
        <p>{activeFilm.tag}</p>
        <h3>{activeFilm.title}</h3>
        <span>{activeFilm.description}</span>
        {activeFilm.details ? (
          <div className="film-detail-pills" aria-label="作品关键词">
            {activeFilm.details.map((detail) => (
              <b key={detail}>{detail}</b>
            ))}
          </div>
        ) : null}
      </div>
      <div className="film-strip-shell">
        <button className="film-scroll-control prev" type="button" onClick={() => scrollFilmStrip(-1)} aria-label="向左滑动短片">
          {"<"}
        </button>
        <div className="film-strip" ref={stripRef} onScroll={syncActiveFilmFromScroll} aria-label="短片列表">
          {filmWorks.map((film, index) => (
            <button
              className={activeFilm.title === film.title ? "film-tile is-active" : "film-tile"}
              key={film.title}
              type="button"
              onClick={() => setActiveFilm(film)}
              style={{
                background: film.poster
                  ? `linear-gradient(180deg, rgba(5, 7, 13, 0.08), rgba(5, 7, 13, 0.76)), url(${film.poster}) center / cover`
                  : film.wallpaper,
                "--tile": index,
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{film.title}</strong>
              <em>{film.year}</em>
            </button>
          ))}
        </div>
        <button className="film-scroll-control next" type="button" onClick={() => scrollFilmStrip(1)} aria-label="向右滑动短片">
          {">"}
        </button>
      </div>
    </section>
  );
}

function NalitaPromoSection({ product }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="nalita" className="nalita-promo-section">
      <img className="nalita-promo-bg" src="/assets/nalita-cover-temp.webp" alt="娜莉塔 NALITA 临时背景展示" loading="lazy" decoding="async" />
      <div className="nalita-promo-vignette" />
      <div className="nalita-promo-lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="nalita-promo-tag">AI DESKTOP COMPANION</div>
      <div className="nalita-promo-copy">
        <p className="section-code">05 / Future Product</p>
        <h2>
          NALITA
          <span>娜莉塔</span>
        </h2>
        <p>{product.logline}</p>
      </div>
      <div className="nalita-ui-card card-a">SHOT LIST</div>
      <div className="nalita-ui-card card-b">REVISION</div>
      <div className="nalita-ui-card card-c">PROMPT AI</div>
      <button
        className="nalita-inline-toggle"
        type="button"
        onClick={() => setShowDetails((value) => !value)}
      >
        {showDetails ? "收起详情" : "产品详情"}
      </button>
      <div className={`nalita-inline-details ${showDetails ? "is-open" : ""}`}>
        <div className="nalita-panel">
          <h3>角色定位</h3>
          <p>
            NALITA 是面向执行导演的 AI 桌宠产品概念。它不是公开发售产品，
            而是作为作品集中的附加 demo，展示我对 AI 影像工作流、桌面助手和创作陪伴产品的设想。
          </p>
        </div>
        <div className="nalita-panel">
          <h3>核心能力</h3>
          <div className="nalita-abilities">
            {product.abilities.map((ability) => (
              <span key={ability}>{ability}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const timeline = [
  {
    time: "2026.01 - 至今",
    company: "北京天工艺彩文化传播有限公司",
    title: "AIGC 导演 / AI 影像执行导演",
  },
  {
    time: "2025.06 - 2025.11",
    company: "异类光彩（北京）传媒有限公司",
    title: "视觉设计师",
  },
  {
    time: "2024 / 2023",
    company: "中影年年（北京）文化传媒有限公司",
    title: "动画分镜师 / 动画分镜设计师",
  },
  {
    time: "2021 - 2025",
    company: "黄淮学院",
    title: "动画 本科",
  },
];

function VideoField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let raf = 0;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastDraw = -Infinity;

    const draw = (now = 0) => {
      if (now - lastDraw < 42) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastDraw = now;
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#05070d");
      bg.addColorStop(0.46, "#0e1624");
      bg.addColorStop(1, "#040507");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      for (let y = 0; y < height; y += 72) {
        ctx.strokeStyle = "rgba(178, 255, 45, 0.035)";
        ctx.beginPath();
        ctx.moveTo(0, y + Math.sin(time * 0.01 + y) * 8);
        ctx.lineTo(width, y + Math.cos(time * 0.008 + y) * 8);
        ctx.stroke();
      }

      for (let i = 0; i < 22; i += 1) {
        const p = ((time * (0.0016 + i * 0.00002) + i * 0.037) % 1);
        const x = width * p;
        const y = (height * ((i * 97) % 100)) / 100;
        const length = 160 + (i % 6) * 42;
        ctx.strokeStyle =
          i % 3 === 0
            ? "rgba(191,255,28,.22)"
            : i % 3 === 1
              ? "rgba(80,183,255,.16)"
              : "rgba(255,255,255,.12)";
        ctx.lineWidth = i % 5 === 0 ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(x - length, y);
        ctx.lineTo(x, y + Math.sin(time * 0.02 + i) * 18);
        ctx.stroke();
      }

      if (!reducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    if (reducedMotion) return undefined;
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="video-field" aria-hidden="true" />;
}

function App() {
  const appRef = useRef(null);
  const [activeIp, setActiveIp] = useState(null);

  useEffect(() => {
    const syncHash = () => {
      const slug = window.location.hash.replace("#ip-", "");
      const nextIp = ipWorks.find((item) => item.slug === slug) || null;
      setActiveIp(nextIp);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const openIp = (item) => {
    setActiveIp(item);
    window.history.pushState(null, "", `#ip-${item.slug}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeIp = () => {
    setActiveIp(null);
    window.history.pushState(null, "", "#ip");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    setTimeout(() => document.querySelector("#ip")?.scrollIntoView({ behavior: "smooth" }), 0);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      const opening = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => ScrollTrigger.refresh(),
      });

      opening
        .set(".site-nav", { y: -28, opacity: 0 })
        .set(".hero-image", { scale: 1.12, xPercent: 3, filter: "contrast(1.08) brightness(0.42) sepia(0.08)" })
        .set(".line-top, .line-mid", { scaleX: 0, transformOrigin: "left center" })
        .set(".line-left", { scaleY: 0, transformOrigin: "top center" })
        .set(".hero-meta span, .hero-stats div, .hero-service, .hero-chip, .hero-actions a", {
          y: 28,
          opacity: 0,
        })
        .set(".hero-copy .kicker, .hero-copy h1, .hero-lead", {
          y: 78,
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
        })
        .to(".curtain-panel", {
          yPercent: -101,
          duration: 1.35,
          stagger: 0.11,
          ease: "expo.inOut",
        })
        .to(".site-nav", { y: 0, opacity: 1, duration: 0.7 }, "-=0.65")
        .to(".hero-image", {
          scale: 1.01,
          xPercent: 0,
          filter: "contrast(1.08) brightness(0.72) sepia(0.08)",
          duration: 1.6,
        }, "-=1.05")
        .to(".line-top, .line-mid", { scaleX: 1, duration: 1.0, stagger: 0.12 }, "-=1.0")
        .to(".line-left", { scaleY: 1, duration: 1.0 }, "-=0.9")
        .to(".hero-copy .kicker, .hero-copy h1, .hero-lead", {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.95,
          stagger: 0.13,
        }, "-=0.55")
        .to(".hero-meta span, .hero-stats div, .hero-service, .hero-chip, .hero-actions a", {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.07,
        }, "-=0.55")
        .set(".intro-curtain", { display: "none" });

      gsap.to(".hero-image", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.utils.toArray(".page-section, .film-showcase, .contact-section").forEach((section) => {
        const heading = section.querySelector(".section-head h2, .contact-panel h2");
        const bgTitle = section.querySelector(".section-bg-title");
        const code = section.querySelector(".section-code");
        const cards = section.querySelectorAll(
          ".project-card, .ip-card, .film-card, .film-tile, .strength-card, .timeline article, .portrait-panel, .profile-copy, .contact-row a"
        );

        if (code) {
          gsap.from(code, {
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 78%" },
          });
        }

        if (heading) {
          gsap.from([bgTitle, heading].filter(Boolean), {
            y: 90,
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
            duration: 1.15,
            stagger: 0.08,
            ease: "power4.out",
            scrollTrigger: { trigger: section, start: "top 74%" },
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            y: 72,
            opacity: 0,
            scale: 0.96,
            duration: 1.05,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 68%" },
          });
        }
      });

      gsap.utils.toArray(".project-visual, .ip-orbit").forEach((visual) => {
        gsap.fromTo(
          visual,
          { yPercent: -4 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: visual,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="site-shell" ref={appRef}>
      <VideoField />
      <div className="intro-curtain" aria-hidden="true">
        <div className="curtain-panel" />
        <div className="curtain-panel" />
        <div className="curtain-panel" />
      </div>
      <header className="site-nav">
        <a href="#top" className="brand">
          <span className="brand-sign">zsr</span>
          <span>郑尚若</span>
        </a>
        <nav aria-label="页面导航">
          <a href="#profile">经历</a>
          <a href="#projects">项目</a>
          <a href="#ip">IP</a>
          <a href="#nalita">NALITA</a>
          <a href="#films">短片</a>
          <a href="#strength">优势</a>
          <a href="#contact">联系</a>
        </nav>
        <a className="nav-cta" href="mailto:jbdss2@163.com">
          Contact
        </a>
      </header>

      {activeIp ? <IpDetailPage item={activeIp} onBack={closeIp} /> : null}

      <main id="top">
        <section className="hero">
          <img className="hero-image" src="/assets/zsr-hero.webp" alt="zsr portfolio hero" decoding="async" fetchPriority="high" />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="hero-line line-top" aria-hidden="true" />
          <div className="hero-line line-mid" aria-hidden="true" />
          <div className="hero-line line-left" aria-hidden="true" />

          <div className="hero-meta hero-meta-left">
            <span>Visual Designer</span>
            <span>AI Designer</span>
            <span>Brand Designer</span>
          </div>

          <div className="hero-chip">
            <span>Selected Reel</span>
            <strong>AIGC Film Pipeline</strong>
          </div>

          <a className="hero-service" href="#ip" aria-label="查看个人 IP">
            <span>Personal IP</span>
            <strong>Our service</strong>
          </a>

          <div className="hero-copy">
            <p className="kicker">zsr / portfolio 2026</p>
            <h1>
              AI VISUAL
              <span>PORTFOLIO</span>
            </h1>
            <p className="hero-lead">
              用导演思维组织叙事，用 AIGC 与 CG Pipeline 搭建可执行的影像视觉方案。
            </p>
          </div>

          <div className="hero-actions">
            <a href="#projects">Selected Work</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="hero-stats">
            {heroStats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="profile" className="profile page-section">
          <div className="section-head profile-heading">
            <span className="section-bg-title">PROFILE</span>
            <p className="section-code">01 / Personal Profile</p>
            <h2>个人经历</h2>
          </div>
          <div className="portrait-panel">
            <img src="/assets/resume-image-1-3.png" alt="郑尚若头像" loading="lazy" decoding="async" />
            <div className="portrait-glow" />
          </div>
          <div className="profile-copy">
            <h2>从动画分镜到 AIGC 影像流程的复合创作者</h2>
            <p>
              职业方向定位为 AIGC 执行导演、动画分镜导演与 AI
              影像流程负责人。曾参与动画番剧、AI 剧集、PV
              及原创概念短片项目，熟悉从剧本拆解、分镜设计、镜头生成、角色一致性控制、返修管理到剪辑合成的制作流程。
            </p>
            <div className="profile-data">
              <span>24 岁</span>
              <span>导演 / 编导</span>
              <span>薪资面议</span>
              <span>北京</span>
            </div>
          </div>
        </section>

        <section id="projects" className="page-section">
          <div className="section-head">
            <span className="section-bg-title">PROJECTS</span>
            <p className="section-code">02 / Selected Projects</p>
            <h2>精选项目</h2>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-visual" style={{ "--index": index }}>
                  {project.flow ? (
                    <div className="project-flow" aria-label="项目流程">
                      {project.flow.map((step, stepIndex) => (
                        <b key={step} style={{ "--step": stepIndex }}>
                          {step}
                        </b>
                      ))}
                    </div>
                  ) : null}
                  <span>{project.tag}</span>
                </div>
                <div className="project-body">
                  <div className="project-meta">
                    <span>{project.date}</span>
                    <span>{project.role}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="chip-row">
                    {project.metrics.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="ip" className="page-section ip-section">
          <div className="section-head">
            <span className="section-bg-title">PERSONAL IP</span>
            <p className="section-code">03 / Personal IP</p>
            <h2>个人 IP</h2>
          </div>
          <div className="ip-grid">
            {ipWorks.map((item, index) => (
              <button className="ip-card" key={item.title} type="button" onClick={() => openIp(item)}>
                <div className="ip-orbit" style={{ "--index": index }}>
                  <span>{item.type}</span>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="ip-open">进入 IP 页面</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <FilmShowcase />

        <NalitaPromoSection product={nalitaProduct} />

        <section id="strength" className="page-section strength-section">
          <div className="section-head">
            <span className="section-bg-title">ADVANTAGES</span>
            <p className="section-code">06 / Advantages</p>
            <h2>个人优势</h2>
          </div>
          <div className="strength-lead">
            <strong>技术导演 + 创意型导演</strong>
            <p>
              既理解传统影视与动画制作流程，也能搭建 AI 影像 Pipeline、Web coding 页面、Skill 与自动化工具，是偏极端复合型的创作执行者。
            </p>
          </div>
          <div className="strength-grid">
            {strengths.map((item, index) => (
              <div className="strength-card" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
                <div className="strength-tags">
                  {item.tags.map((tag) => (
                    <em key={tag}>{tag}</em>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="page-section timeline-section">
          <div className="section-head">
            <span className="section-bg-title">EXPERIENCE</span>
            <p className="section-code">07 / Experience</p>
            <h2>经历轨迹</h2>
          </div>
          <div className="timeline">
            {timeline.map((item) => (
              <article key={`${item.company}-${item.time}`}>
                <time>{item.time}</time>
                <div>
                  <h3>{item.company}</h3>
                  <p>{item.title}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-panel">
            <p className="section-code">08 / Contact</p>
            <h2>让影像项目从概念进入可执行流程。</h2>
            <p>
              适合 AI 影视、AI 动画、AI 漫剧、原创概念短片、PV
              与品牌视觉项目的前期视觉开发和执行导演协作。
            </p>
            <div className="contact-row">
              <a href="mailto:jbdss2@163.com">jbdss2@163.com</a>
              <a href="tel:18515575976">18515575976</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function IpDetailPage({ item, onBack }) {
  const [activeChild, setActiveChild] = useState(null);
  const current = activeChild || item;
  const gallery = current.gallery || [];
  const process = current.process || [];

  return (
    <section className="ip-detail-page" aria-label={`${current.title} 详情页`}>
      <div
        className="ip-detail-bg"
        style={current.heroImage ? { "--ip-bg": `url(${current.heroImage})` } : undefined}
      />
      <button className="ip-back" type="button" onClick={onBack}>
        返回作品集
      </button>
      <div className="ip-detail-shell">
        <p className="section-code">Personal IP / {current.type}</p>
        <h1>{current.title}</h1>
        <p className="ip-logline">{current.logline}</p>
        {item.children ? (
          <div className="ip-universe-switch" aria-label="幽界之门系列宇宙切换">
            <button
              className={!activeChild ? "is-active" : ""}
              type="button"
              onClick={() => setActiveChild(null)}
            >
              系列总览
            </button>
            {item.children.map((child) => (
              <button
                className={activeChild?.slug === child.slug ? "is-active" : ""}
                key={child.slug}
                type="button"
                onClick={() => setActiveChild(child)}
              >
                {child.title}
              </button>
            ))}
          </div>
        ) : null}
        <div className="ip-detail-grid">
          <div className={current.heroImage ? "ip-detail-visual has-media" : "ip-detail-visual"}>
            {current.video ? (
              <video
                controls
                preload="metadata"
                poster={current.heroImage}
                src={current.video}
              />
            ) : current.heroImage ? (
              <img src={current.heroImage} alt={`${current.title} 视觉资产`} loading="eager" decoding="async" />
            ) : null}
            <span>{current.type}</span>
          </div>
          <div className="ip-detail-copy">
            <h2>项目概念</h2>
            <p>{current.description}</p>
            <div className="ip-keywords">
              {current.keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          </div>
        </div>
        {gallery.length ? (
          <div className="ip-asset-section">
            <div className="ip-asset-head">
              <p className="section-code">Visual Assets</p>
              <h2>视觉资产</h2>
            </div>
            <div className="ip-asset-grid">
              {gallery.map((asset) => (
                <article className="ip-asset-card" key={asset.title}>
                  <img src={asset.image} alt={asset.title} loading="lazy" decoding="async" />
                  <div>
                    <h3>{asset.title}</h3>
                    <p>{asset.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
        {process.length ? (
          <div className="ip-process-strip" aria-label="项目制作状态">
            {process.map((step, index) => (
              <span key={step}>
                {String(index + 1).padStart(2, "0")} / {step}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default App;
