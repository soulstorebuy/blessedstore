document.addEventListener('DOMContentLoaded', function() {

	const modal = document.createElement('div');
	modal.id = 'buy-modal';
	modal.style.display = 'none';
	modal.innerHTML = `
		<div class="modal-backdrop"></div>
		<div class="modal-content">
			<img class="modal-img" src="" alt="" />
			<div class="modal-title"></div>
			<div class="modal-desc"></div>
			<div class="modal-price"></div>
			<a class="modal-buy-btn" target="_blank" rel="noopener">Купить в Telegram</a>
			<button class="modal-close">×</button>
		</div>
	`;
	document.body.appendChild(modal);

	function showModal(product, desc) {
		modal.querySelector('.modal-img').src = product.img;
		modal.querySelector('.modal-img').alt = product.title;
		modal.querySelector('.modal-title').textContent = product.title;
		modal.querySelector('.modal-desc').textContent = desc || '';
		modal.querySelector('.modal-price').textContent = product.price;
		const tgText = encodeURIComponent(`Здравствуйте, хочу купить ${product.title} за ${product.price}`);
		modal.querySelector('.modal-buy-btn').href = `https://t.me/bIessedsouI?text=${tgText}`;
		modal.style.display = 'flex';
		document.body.style.overflow = 'hidden';
	}
	function hideModal() {
		modal.style.display = 'none';
		document.body.style.overflow = '';
	}
	modal.querySelector('.modal-close').onclick = hideModal;
	modal.querySelector('.modal-backdrop').onclick = hideModal;

	const productDescriptions = {
		'Leobog Hi75': 'Механическая клавиатура в компактном формате 75% (81 клавиша). Проводная, с USB Type‑C интерфейсом, и обладает целым рядом функций, ориентированных как на геймеров, так и на тех, кому важна качественная печать и кастомизация.',
		'Akko Year of Dragon': 'Лимитированная механическая клавиатура в формате 75%, созданная в честь Года Дракона. Её корпус выполнен из анодированного алюминия с уникальной "драконьей" текстурой, а внутренняя конструкция на базе магнитных переключателей Hall Effect позволяет настраивать точку срабатывания и использовать функцию Rapid Trigger — идеально для киберспорта и высокоскоростной печати. Поддержка частоты опроса 8000 Гц, кастомные PBT-кейкапы, RGB-подсветка и премиум-сборка делают эту модель не просто инструментом, а настоящим арт-объектом на вашем столе.',
		'Ardor Gaming Patron': 'Механическая клавиатура в компактном формате (примерно 60‑% с 67 клавишами), ориентированная на геймеров и любителей кастома. Подключение — проводное (USB Type‑A), длина кабеля около 1,8 м. Корпус пластмассовый, дизайн — яркий, могут быть версии в красном или фиолетовом цвете. Имеет RGB‑подсветку, “горячую” замену свитчей (Hot‑Swap), комплект с запасными кейкапами и свитчами, двойным пуллером. Переключатели — Gateron Yellow или Gateron Yellow Pro (линейного типа), что обеспечивает плавный ход клавиш. Языковые раскладки — русский и английский. Профиль кейкапов — XDA в некоторых версиях.',
		'Ninjutso sora v2': 'Лёгкая (≈ 39‑41 г) беспроводная игровая мышь, созданная для тех, кто ценит скорость, точность и комфорт в длительной работе. Она подходит и для игр, и для задач, где важна отзывчивость мыши. Модель выпускается в нескольких цветах (чёрный, белый и розовый).',
		'Logitech g pro x superlight 2': 'Лёгкость, надёжность и максимальная производительность — всё, что нужно для победы на высоком уровне. Вес всего 63 грамма делает эту модель практически невесомой, обеспечивая невероятную манёвренность в динамичных играх. Высокоточный сенсор HERO с разрешением до 25 600 DPI гарантирует мгновенное и точное считывание движений без сглаживания, ускорения или фильтрации.',
		'Scyrox v8': 'Максимальная производительность в ультралёгком корпусе — всё, что нужно для современного геймера, сосредоточенного на результате. Благодаря сенсору PixArt PAW3950 с точностью до 30 000 DPI и частоте опроса до 8000 Гц, каждое движение отслеживается мгновенно и с хирургической точностью — независимо от скорости и направления.',
		'Fifine Am8': 'Идеальное решение для стриминга и записи голоса с кардиоидной направленностью, которая эффективно изолирует голос и снижает посторонние шумы. Надёжное подключение через USB‑C или XLR обеспечивает универсальность использования, а встроенный выход на наушники с мониторингом позволяет контролировать звук в реальном времени. Прочный металлический корпус гарантирует долговечность, а сенсорная кнопка отключения звука и регуляторы громкости делают управление максимально удобным. Стильная RGB‑подсветка добавляет современный акцент и создаёт атмосферу профессионализма.',
		'HyperX QuadCast': 'Универсальное решение для стримеров, подкастеров и геймеров, обеспечивающее высококачественную запись звука и удобство использования. Он оснащён четырьмя настраиваемыми направленностями: кардиоидной, всенаправленной, стерео и двунаправленной, что позволяет адаптировать устройство под различные сценарии записи. Встроенный поп-фильтр минимизирует шумы от дыхания и взрывных согласных, а антивибрационная подвеска снижает механические шумы от стола или клавиатуры.',
		'Ardor Gaming Stream': 'Оптимальный выбор для начинающих стримеров и подкастеров, которые ищут качественный звук и удобство в использовании при ограниченном бюджете. Он оснащён кардиоидной направленностью, что минимизирует захват посторонних шумов и фокусирует внимание на вашем голосе. Частотный диапазон от 30 до 18 000 Гц обеспечивает чёткую и детализированную передачу речи. Встроенный поп-фильтр дополнительно снижает шумы от дыхания и взрывных согласных, улучшая качество записи.',
		'Artisan Type 99': 'Премиальный ковер для геймеров, стремящихся к абсолютному контролю и точности. Разработанный японским брендом Artisan, он предназначен для игроков с низкой чувствительностью, ценящих высокое сопротивление и стабильность при движении мыши.',
		'Skypad Sora': 'Премиальный стеклянный игровой коврик, разработанный брендом Wallhack (ранее известным как Skypad) в Дании. Он выделяется среди других аксессуаров своей уникальной эстетикой и высокими эксплуатационными характеристиками.',
		'Zowie by Benq': 'Серия игровых ковров, разработанных с учётом потребностей профессиональных киберспортсменов и требовательных геймеров. Каждая модель сочетает в себе высокое качество материалов, продуманный дизайн и функциональность, обеспечивая стабильную и точную работу мыши в любых игровых ситуациях.',
		'Logitech g735': 'Беспроводная игровая гарнитура премиум-класса, ориентированная на комфорт, стиль и универсальность. Она идеально подходит для длительных игровых сессий, стриминга и повседневного использования благодаря легкому весу, продуманному дизайну и широким возможностям подключения.',
		'HyperX Cloud 2': 'Игровая гарнитура, которая завоевала популярность благодаря своему качественному звуку, комфорту и универсальности. С момента своего выпуска она стала выбором многих геймеров, стремящихся к высококачественному аудиоопыту.',
		'Razer Kraken': 'Гарнитура сочетает мощный звук с продуманным комфортом — мягкие амбушюры с охлаждающим гелем и легкая, но прочная конструкция обеспечивают удобство даже в долгих игровых сессиях. Четкое звучание и шумоподавляющий микрофон гарантируют, что каждое слово будет слышно идеально. Универсальная совместимость и простое управление делают её отличным выбором для геймеров, ценящих качество и удобство.'
	};

	const content = document.getElementById('content');
	const navBtns = document.querySelectorAll('.nav-btn');

	const storeTitle = document.querySelector('.store-title');
	if (storeTitle) {
		const text = storeTitle.textContent;
		storeTitle.textContent = '';
		for (let i = 0; i < text.length; i++) {
			const span = document.createElement('span');
			span.textContent = text[i];
			span.className = 'store-letter';
			span.onmouseenter = () => span.classList.add('glow');
			span.onmouseleave = () => span.classList.remove('glow');
			storeTitle.appendChild(span);
		}
	}


	const pages = {
		home: `<h2>Добро пожаловать в Blessed Store!</h2><p>Лучший магазин периферии для геймеров и профессионалов. Здесь вы найдёте только лучшие девайсы. Клавиатуры. мыши, микрофоны, коврики и наушники из нашего магазина имеют наилучшее качество для пользователя. \nНужное меню можете выбрать выше.</p>` ,
		about: `<h2>О нас</h2><p>Blessed Store — лучший магазин девайсов, который с 2025 года помогает людям собирать идеальные рабочие и игровые места. Мы работаем только с проверенными брендами и любим своё дело!</p>`,
		shop: `<h2>Категории товаров</h2><div class="shop-categories">
			<div class="cat-card" data-cat="keyboards">
				<img src="https://en.akkogear.com/wp-content/uploads/2023/06/cropped-3.jpg" alt="Клавиатуры">
				<div class="cat-title">Клавиатуры</div>
			</div>
			<div class="cat-card" data-cat="mice">
				<img src="https://www.3ona51.com/images/products/gaming-mouses/scyrox-v8-black-scy-01/01-1.jpg" alt="Мыши">
				<div class="cat-title">Мыши</div>
			</div>
			<div class="cat-card" data-cat="microphones">
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkPy38CJzDv487EpOyeX8g0D48ru25-G21qw&s" alt="Микрофоны">
				<div class="cat-title">Микрофоны</div>
			</div>
			<div class="cat-card" data-cat="pads">
				<img src="https://cdn.mos.cms.futurecdn.net/QHQFFaaqo296oKhb88hmwT.jpeg" alt="Коврики">
				<div class="cat-title">Коврики</div>
			</div>
			<div class="cat-card" data-cat="headphones">
				<img src="https://image.news.livedoor.com/newsimage/stf/6/7/67a8b_1838_9dd79bd83c3cfc5dc99428580065f05a.jpg" alt="Наушники">
				<div class="cat-title">Наушники</div>
			</div>
		</div>`,
		rates: 'RATES_PLACEHOLDER',
				reviews: `<h2>Обзоры</h2>
					<div class="reviews-slider-wrap">
						<button class="slider-arrow slider-arrow-left">&#8592;</button>
						<div class="reviews-slider-outer">
							<div class="reviews-slider">
								<!-- Видео будут вставлены скриптом -->
							</div>
						</div>
						<button class="slider-arrow slider-arrow-right">&#8594;</button>
					</div>`
	};
			const reviewVideos = [
				'https://www.youtube.com/embed/gX5DXSiD6E4?si=1my3C7oizOlOkbDt',
				'https://www.youtube.com/embed/aswqGQ4kf-8?si=yvckLIo186wMk_pF',
				'https://www.youtube.com/embed/6pKhMqiTu-M?si=dP1EFmVbxfXLveW5',
				'https://www.youtube.com/embed/RpV6T2m4-kw?si=myFioUB6Yfg9MAQR',
				'https://www.youtube.com/embed/CeC09zOxXz8?si=jftAE1DC4b9dcev9',
				'https://www.youtube.com/embed/U_Ijgr14Ox8?si=NUnylJMAUfxKn9gK',
				'https://www.youtube.com/embed/r5u4EKGVifE?si=pJZYQeRtF7-_Nz4A',
				'https://www.youtube.com/embed/PWSYr_pIvrs?si=VGsloKZOKVp0l_3V',
				'https://www.youtube.com/embed/hsoKm51LRis?si=XxThBTuO5MNr6KM7',
				'https://www.youtube.com/embed/wpb29GNWsYc?si=7ddOuQx3wADoPApl',
				'https://www.youtube.com/embed/IYunBp-FqvM?si=748b1jyzcsgkmvTj',
				'https://www.youtube.com/embed/wLH3HNx_MvQ?si=hadQgTr4frsPy5VX',
				'https://www.youtube.com/embed/alalMH-dIIg?si=XmqKsO4XTyNxQ_oo',
				'https://www.youtube.com/embed/8Df518Zd8ow?si=NWj4lH_psZKrMFsf',
				'https://www.youtube.com/embed/7spgk4m-w9M?si=ZBZ8juUuggatADVa'
			];

						function getYoutubeId(url) {
							const match = url.match(/embed\/([\w-]+)/);
							return match ? match[1] : '';
						}
						const reviewThumbnails = reviewVideos.map(url => {
							const id = getYoutubeId(url);
							const img = new window.Image();
							img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
							img.className = 'review-video-thumb';
							img.alt = 'YouTube preview';
							img.loading = 'lazy';
							return img;
						});
						function createPreviewThumbByIndex(idx) {
							return reviewThumbnails[idx].cloneNode(true);
						}

						function renderReviewsSlider(startIdx = 0, direction = 0) {
							const slider = document.querySelector('.reviews-slider');
							if (!slider) return;
							const videosToShow = 3;
							if (!slider.children.length || direction === 0) {
								slider.innerHTML = '';
								for (let i = 0; i < videosToShow; i++) {
									const idx = (startIdx + i) % reviewVideos.length;
									const thumbWrap = document.createElement('div');
									thumbWrap.className = 'review-video-thumb-wrap';
									const thumb = createPreviewThumbByIndex(idx);
									thumbWrap.appendChild(thumb);
									slider.appendChild(thumbWrap);
									thumb.onload = () => {
										setTimeout(() => {
											const iframe = document.createElement('iframe');
											iframe.src = reviewVideos[idx];
											iframe.width = '100%';
											iframe.height = '240';
											iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
											iframe.allowFullscreen = true;
											iframe.className = 'review-video';
											thumbWrap.replaceWith(iframe);
										}, 100);
									};
								}
								slider.style.transform = 'translateX(0)';
								return;
							}
							const width = slider.querySelector('.review-video, .review-video-thumb-wrap').offsetWidth + 24;
							if (direction > 0) {
								const nextIdx = (startIdx + videosToShow - 1) % reviewVideos.length;
								const thumbWrap = document.createElement('div');
								thumbWrap.className = 'review-video-thumb-wrap';
								const thumb = createPreviewThumbByIndex(nextIdx);
								thumbWrap.appendChild(thumb);
								slider.appendChild(thumbWrap);
								thumb.onload = () => {
									setTimeout(() => {
										const iframe = document.createElement('iframe');
										iframe.src = reviewVideos[nextIdx];
										iframe.width = '100%';
										iframe.height = '240';
										iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
										iframe.allowFullscreen = true;
										iframe.className = 'review-video';
										thumbWrap.replaceWith(iframe);
									}, 100);
								};
								slider.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
								slider.style.transform = `translateX(-${width}px)`;
								setTimeout(() => {
									slider.style.transition = 'none';
									slider.style.transform = 'translateX(0)';
									slider.removeChild(slider.firstElementChild);
								}, 500);
							} else if (direction < 0) {
								const prevIdx = (startIdx) % reviewVideos.length;
								const thumbWrap = document.createElement('div');
								thumbWrap.className = 'review-video-thumb-wrap';
								const thumb = createPreviewThumbByIndex(prevIdx);
								thumbWrap.appendChild(thumb);
								slider.insertBefore(thumbWrap, slider.firstElementChild);
								thumb.onload = () => {
									setTimeout(() => {
										const iframe = document.createElement('iframe');
										iframe.src = reviewVideos[prevIdx];
										iframe.width = '100%';
										iframe.height = '240';
										iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
										iframe.allowFullscreen = true;
										iframe.className = 'review-video';
										thumbWrap.replaceWith(iframe);
									}, 100);
								};
								slider.style.transition = 'none';
								slider.style.transform = `translateX(-${width}px)`;
								setTimeout(() => {
									slider.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
									slider.style.transform = 'translateX(0)';
								}, 10);
								setTimeout(() => {
									slider.removeChild(slider.lastElementChild);
								}, 510);
							}
						}

		let reviewSliderIdx = 0;

const reviews = [
	{
		avatar: 'https://ik.imagekit.io/vvjf69lkh/kostyanchik.jpg?updatedAt=1758518435265',
		name: 'Konstantin',
		text: 'Очень доволен покупкой! Клавиатура, в отличии от твд, пиздатая, доставка быстрая.',
		stars: 5,
	},
	{
		avatar: 'https://ik.imagekit.io/vvjf69lkh/rabianchik.jpg?updatedAt=1758518563375',
		name: 'Aetheryn 🪷',
		text: 'Магазин понравился, мышь отличная (хоть и тяжелая), но доставка задержалась на день.',
		stars: 4,
	},
	{
		avatar: 'https://ik.imagekit.io/vvjf69lkh/vovchik.jpg?updatedAt=1758518733373',
		name: 'AniBust',
		text: 'Купил наушники — звук шикарный, спасибо! \nupd: Но цыганка выше спиздила их. 1 звезда.',
		stars: 1,
	},
	{
		avatar: 'https://ik.imagekit.io/vvjf69lkh/lehchik.jpg?updatedAt=1758518733389',
		name: 'Fogler',
		text: 'Мне все понравилось)))оч крутой магазин!!!',
		stars: 5,
	},
	{
		avatar: 'https://ik.imagekit.io/vvjf69lkh/arturchik.jpg?updatedAt=1758518732509',
		name: 'half blood prince',
		text: 'Микрофон хороший. Мне понравилась расцветка, которая идеально подчеркивала мою дединсайдность. \nОднако, от вечной депрессии она меня не спасла, поэтому 4.',
		stars: 4,
	},
	{
		avatar: 'https://ik.imagekit.io/vvjf69lkh/nutria.jpg?updatedAt=1758518733463',
		name: 'Nutria Gold',
		text: 'Хуйня ебанная, никогда здесь больше ничего не куплю!!!',
		stars: 1,
	},
		{
		avatar: 'https://ik.imagekit.io/vvjf69lkh/%D1%8F.jpg?updatedAt=1758530233057',
		name: 'Blessed Soul',
		text: 'АХУЕННЫЙ МАГАЗИН! ! !  !  ! !! ! !',
		stars: 5,
	},
			{
		avatar: 'https://i.pinimg.com/736x/58/8e/0e/588e0e6b67116e43fa21064efc58d084.jpg',
		name: 'Рик Граймс',
		text: 'Магазин вроде классный, но я даун ебанный. Т.к. это не вина магазина - оценку сильно занижать не буду...',
		stars: 3,
	},
				{
		avatar: 'https://i.pinimg.com/736x/a4/42/18/a44218abdfa6b16e36b6d746053fe823.jpg',
		name: 'Камадо Танджиро',
		text: 'Очень хороший магазин! Хотел купить девайсы некоторым членам семьи, но Мудзан убил их всех, кроме сестры. Сестру послал нахуй.',
		stars: 4,
	},
					{
		avatar: 'https://i.pinimg.com/736x/9f/35/e5/9f35e54be60b691d61b5557b17411d6c.jpg',
		name: 'Eminem',
		text: 'You better lose yourself in the music, the moment, you own it, you better never let it go.',
		stars: 5,
	},
						{
		avatar: 'https://cdn-images.dzcdn.net/images/cover/4cdf140847fdb2ec1827854f68544df8/0x1900-000000-80-0-0.jpg',
		name: 'Полматери',
		text: 'Кто бы что ни говорил, наш тандем куда сильнее, чем любой строгий режим. Из обезьянника поедем в самый лучший ресторан. За разбитую посуду и еду заплачу сам',
		stars: 5,
	},
];


function renderStars(stars) {
	let html = '';
	for (let i = 0; i < 5; i++) {
		if (i < stars) {
			html += '<span class="star filled">★</span>';
		} else {
			html += '<span class="star">★</span>';
		}
	}
	return html;
}

function renderRates() {
	let html = '<h2>Отзывы покупателей</h2><div class="reviews-list">';
	reviews.forEach((r, idx) => {
		if (r.name === 'half blood prince') {
			html += `<div class="review-card">
				<div class="review-avatar" id="avatar-hbp">
					<img src="${r.avatar}" alt="${r.name}" id="main-hbp">
					<img src="https://ik.imagekit.io/vvjf69lkh/arturhahaha.jpg?updatedAt=1758528771043" alt="secret" id="alt-hbp" style="display:none;position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;border-radius:50%;">
				</div>
				<div class="review-content">
					<div class="review-name">${r.name}</div>
					<div class="review-stars">${renderStars(r.stars)}</div>
					<div class="review-text">${r.text}</div>
				</div>
			</div>`;
		} else {
			html += `<div class="review-card">
				<div class="review-avatar"><img src="${r.avatar}" alt="${r.name}"></div>
				<div class="review-content">
					<div class="review-name">${r.name}</div>
					<div class="review-stars">${renderStars(r.stars)}</div>
					<div class="review-text">${r.text}</div>
				</div>
			</div>`;
		}
	});
	html += '</div>';
	content.innerHTML = html;

	const avatar = document.getElementById('avatar-hbp');
	if (avatar) {
		const mainImg = document.getElementById('main-hbp');
		const altImg = document.getElementById('alt-hbp');
		avatar.addEventListener('mouseenter', () => {
			mainImg.style.display = 'none';
			altImg.style.display = 'block';
		});
		avatar.addEventListener('mouseleave', () => {
			mainImg.style.display = 'block';
			altImg.style.display = 'none';
		});
	}
}


	const products = {
		keyboards: [
			{title: 'Leobog Hi75', price: '34 990 тг', img: 'https://cdn.shopify.com/s/files/1/0840/2295/2254/files/203A9289_1.jpg?v=1739524113',},
			{title: 'Akko Year of Dragon', price: '99 990 тг', img: 'https://en.akkogear.com/wp-content/uploads/2024/02/MOD007v3-HE-Dragon-XQ-CT-XYL.jpg',},
			{title: 'Ardor Gaming Patron', price: '39 990 тг', img: 'https://o.dns-shop.ru/original/st1/00712ae4f541620d0eb83e5d4ecac484/bfe33fdab171b7258ddfc671214b4bd5cb68785a5a3ff75757db76e0e3287d9f.jpg',},
		],
		mice: [
			{title: 'Ninjutso sora v2', price: '49 990 тг', img: 'https://ninjutso.com/cdn/shop/files/1_fc47a72a-d895-4be4-a133-264f52dfeb98.jpg?v=1717589054',},
			{title: 'Logitech g pro x superlight 2', price: '89 990 тг', img: 'https://external-preview.redd.it/logitechs-pro-x-superlight-2c-leaks-ahead-of-launch-v0-GdyW12ZzRu2qiYKT7JciJfQ2jyEFygZ2p_drwzkUQVQ.jpeg?auto=webp&s=a80289e3f67e2f6d4acb2f297e1734689142420b',},
			{title: 'Scyrox v8', price: '29 990 тг', img: 'https://scyrox.com/cdn/shop/files/11_3fb6ef19-b69c-442f-b844-4dcb1e5e07a0.jpg?v=1724485485&width=1800',},
		],
		microphones: [
			{title: 'Fifine Am8', price: '29 990 тг', img: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/a166fb53-a5cd-4fb9-a02d-4999865e2877.__CR0,0,600,450_PT0_SX600_V1___.jpg',},
			{title: 'HyperX QuadCast', price: '79 990 тг', img: 'https://cdn.mos.cms.futurecdn.net/KwpjPGB6w895jhWCYLgioj.jpg',},
			{title: 'Ardor Gaming Stream', price: '59 990 тг', img: 'https://sun9-25.userapi.com/impg/f4RdQeKl8kzRzx0xAJTDDL-3cM2LqmuRBWF6lw/x0O8iNkxgMo.jpg?size=600x415&quality=96&sign=942257c39ce3c5cd3406fce02425a3c2&type=album',},
		],
		pads: [
			{title: 'Artisan Type 99', price: '79 990 тг', img: 'https://ir-3.ozone.ru/s3/multimedia-1-1/wc1000/7823468737.jpg',},
			{title: 'Skypad Sora', price: '29 990 тг', img: 'https://i.ebayimg.com/images/g/SZIAAOSwgytnXZxq/s-l1200.png',},
			{title: 'Zowie by Benq', price: '19 990 тг', img: 'https://ir-3.ozone.ru/s3/multimedia-1-0/c400/7024946688.jpg',},
		],
		headphones: [
			{title: 'Logitech g735', price: '139 990 тг', img: 'https://ae01.alicdn.com/kf/Sd0348ac36b964519ba1ef2d9fd425380p.jpg',},
			{title: 'HyperX Cloud 2', price: '49 990 тг', img: 'https://i.ytimg.com/vi/bbwtQBJMFIA/maxresdefault.jpg',},
			{title: 'Razer Kraken', price: '14 990 тг', img: 'https://i.ytimg.com/vi/EerI8DPogkE/maxresdefault.jpg',},
		],
	};

	function setActive(page) {
		navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.page === page));
	}








	function renderProducts(category) {
		content.classList.add('fade-out');
		setTimeout(() => {
			const items = products[category] || [];
			let html = `<h2>${{
				keyboards: 'Клавиатуры',
				mice: 'Мыши',
				microphones: 'Микрофоны',
				pads: 'Коврики',
				headphones: 'Наушники',
			}[category]}</h2>`;
			html += `<button class="back-to-categories cat-btn" style="margin-bottom:24px;">← Назад</button>`;
			html += '<div class="products-grid">';
			items.forEach(item => {
				html += `<div class="product-card">
					<img src="${item.img}" alt="${item.title}">
					<div class="product-info">
						<div class="product-title">${item.title}</div>
						<div class="product-price">${item.price}</div>
						<button class="buy-btn" data-title="${item.title}">Купить</button>
					</div>
				</div>`;
			});
			html += '</div>';
			content.innerHTML = html;
			document.querySelectorAll('.buy-btn').forEach(btn => {
				btn.onclick = function() {
					const title = btn.getAttribute('data-title');
					const prod = (products[category] || []).find(p => p.title === title);
					showModal(prod, productDescriptions[title]);
				};
			});
			const backBtn = document.querySelector('.back-to-categories');
			if (backBtn) backBtn.onclick = () => {
				content.classList.add('fade-out');
				setTimeout(() => {
					content.innerHTML = pages.shop;
					content.classList.remove('fade-out');
					content.classList.add('fade-in');
					setTimeout(() => content.classList.remove('fade-in'), 260);
					document.querySelectorAll('.cat-card').forEach(card => {
						card.onclick = () => {
							renderProducts(card.dataset.cat);
						};
					});
				}, 220);
			};
			content.classList.remove('fade-out');
			content.classList.add('fade-in');
			setTimeout(() => content.classList.remove('fade-in'), 260);
		}, 220);
	}






	function renderPage(page) {
		setActive(page);
		content.classList.add('fade-out');
		setTimeout(() => {
			content.innerHTML = pages[page];
			content.classList.remove('fade-out');
			content.classList.add('fade-in');
			setTimeout(() => content.classList.remove('fade-in'), 260);
			if (page === 'shop') {
				document.querySelectorAll('.cat-card').forEach(card => {
					card.onclick = () => {
						renderProducts(card.dataset.cat);
					};
				});
			} else if (page === 'rates') {
				renderRates();
			} else if (page === 'reviews') {
								reviewSliderIdx = 0;
								renderReviewsSlider(reviewSliderIdx);
								const left = document.querySelector('.slider-arrow-left');
								const right = document.querySelector('.slider-arrow-right');
								left.onclick = () => {
									reviewSliderIdx = (reviewSliderIdx - 1 + reviewVideos.length) % reviewVideos.length;
									renderReviewsSlider(reviewSliderIdx, -1);
								};
								right.onclick = () => {
									reviewSliderIdx = (reviewSliderIdx + 1) % reviewVideos.length;
									renderReviewsSlider(reviewSliderIdx, 1);
								};
			}
		}, 220);
	}

	navBtns.forEach(btn => {
		btn.onclick = () => renderPage(btn.dataset.page);
	});

	renderPage('home');
});
