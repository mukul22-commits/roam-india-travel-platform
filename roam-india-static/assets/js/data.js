/**
 * ROAM INDIA — Central travel catalogue
 *
 * One structured source of truth for destinations and tour packages.
 * Everything is rendered client-side so the catalogue can grow without
 * duplicating hundreds of static HTML cards.
 */
(function (global) {
  'use strict';

  const IMAGE = {
    mountains: 'assets/images/mountains.png',
    palace: 'assets/images/palace.png',
    backwaters: 'assets/images/backwaters.png',
    fallback: 'assets/images/mountains.png'
  };

  const DEST_IMAGES = {
    manali: 'assets/images/destinations/manali.jpg',
    shimla: 'assets/images/destinations/shimla.jpg',
    jaipur: 'assets/images/destinations/jaipur.jpg',
    udaipur: 'assets/images/destinations/udaipur.jpg',
    alleppey: 'assets/images/destinations/alleppey.jpg',
    munnar: 'assets/images/destinations/kerala.jpg',
    'north-goa': 'assets/images/destinations/north-goa.jpg',
    'south-goa': 'assets/images/destinations/south-goa.jpg',
    leh: 'assets/images/destinations/leh.jpg',
    srinagar: 'assets/images/destinations/srinagar.jpg',
    varanasi: 'assets/images/destinations/varanasi.jpg',
    agra: 'assets/images/destinations/agra.jpg',
    bali: 'assets/images/destinations/bali.jpg',
    singapore: 'assets/images/destinations/singapore.jpg',
    dubai: 'assets/images/destinations/dubai.jpg',
    maldives: 'assets/images/destinations/maldives.jpg',
    phuket: 'assets/images/destinations/phuket.jpg',
    tokyo: 'assets/images/destinations/tokyo.jpg',
    darjeeling: 'assets/images/destinations/darjeeling.jpg',
    kutch: 'assets/images/destinations/kutch.jpg',
    havelock: 'assets/images/destinations/goa.jpg',
    'port-blair': 'assets/images/destinations/goa.jpg',
    spiti: 'assets/images/destinations/mountains.jpg',
    'spiti-valley': 'assets/images/destinations/mountains.jpg'
  };

  const TYPE_IMAGE = {
    Mountains: 'mountains',
    Beaches: 'backwaters',
    Heritage: 'palace',
    Nature: 'backwaters',
    Wildlife: 'backwaters',
    Adventure: 'mountains',
    Spiritual: 'palace',
    Luxury: 'palace',
    Relaxation: 'backwaters',
    Family: 'mountains',
    Romantic: 'backwaters',
    City: 'palace'
  };

  const TYPE_BADGE = {
    Mountains: 'badge-hills',
    Beaches: 'badge-nature',
    Heritage: 'badge-heritage',
    Nature: 'badge-nature',
    Wildlife: 'badge-nature',
    Adventure: 'badge-adventure',
    Spiritual: 'badge-culture',
    Luxury: 'badge-relaxation',
    Relaxation: 'badge-relaxation',
    Family: 'badge-hills',
    Romantic: 'badge-relaxation',
    City: 'badge-culture'
  };

  const TYPE_INTRO = {
    Mountains: 'Cool air, long ridgelines and slow village mornings make this a restorative mountain break.',
    Beaches: 'Days here revolve around the shoreline, fresh local food and an unhurried coastal rhythm.',
    Heritage: 'Layer upon layer of architecture, craft and local history make this a rewarding cultural stop.',
    Nature: 'Forest trails, open water and quiet viewpoints reward travellers who prefer to take their time.',
    Wildlife: 'Early safaris and protected habitats put you close to some of the region’s most remarkable species.',
    Adventure: 'This is a destination for early starts, active days and views that justify every climb.',
    Spiritual: 'Temples, ghats and centuries of pilgrimage tradition give this place a distinctly contemplative pace.',
    Luxury: 'Private stays, considered service and beautiful settings make this an easy place to slow down.',
    Relaxation: 'The appeal here is simple: fewer plans, longer meals and time to properly unwind.',
    Family: 'Easy transfers, open spaces and a broad mix of activities make this a comfortable family stop.',
    Romantic: 'Quiet corners, scenic sunsets and intimate stays suit couples travelling at their own pace.',
    City: 'Markets, museums, food streets and neighbourhood walks give this city plenty of texture.'
  };

  const TYPE_TIPS = {
    Mountains: ['Pack layers even in summer; evenings cool down quickly.', 'Keep a day flexible for weather and road conditions.'],
    Beaches: ['Carry reef-safe sunscreen and a light rain layer.', 'Check local tide and swimming advisories before entering the water.'],
    Heritage: ['Wear comfortable shoes for long walks over stone surfaces.', 'Check monument opening days and camera rules in advance.'],
    Nature: ['Carry refillable water and keep to marked trails.', 'Avoid single-use plastic in forest and wetland areas.'],
    Wildlife: ['Book safari slots early and follow your naturalist’s instructions.', 'Wear muted colours and keep noise to a minimum.'],
    Adventure: ['Confirm operator certifications and safety equipment.', 'Build in an acclimatisation day for high-altitude routes.'],
    Spiritual: ['Dress modestly and observe local temple customs.', 'Photography may be restricted inside shrines; ask first.'],
    Luxury: ['Reserve popular dining and spa slots ahead of arrival.', 'Confirm transfer timings with your hotel concierge.'],
    Relaxation: ['Keep the first and last day light to avoid rushed travel.', 'Ask your stay about quiet hours and local experiences.'],
    Family: ['Plan shorter travel legs and carry snacks for children.', 'Confirm child pricing and extra-bed arrangements.'],
    Romantic: ['Book sunset dinners and private experiences in advance.', 'Choose a stay with quiet rooms away from main roads.'],
    City: ['Use metered transport or verified ride-hailing apps.', 'Keep a little unplanned time for neighbourhood wandering.']
  };

  const DURATION = {
    Mountains: '5 Days / 4 Nights',
    Beaches: '4 Days / 3 Nights',
    Heritage: '3 Days / 2 Nights',
    Nature: '4 Days / 3 Nights',
    Wildlife: '3 Days / 2 Nights',
    Adventure: '4 Days / 3 Nights',
    Spiritual: '3 Days / 2 Nights',
    Luxury: '5 Days / 4 Nights',
    Relaxation: '4 Days / 3 Nights',
    Family: '4 Days / 3 Nights',
    Romantic: '4 Days / 3 Nights',
    City: '3 Days / 2 Nights'
  };

  const DURATION_BY_ID = {
    manali: '4 Days / 3 Nights',
    shimla: '3 Days / 2 Nights',
    jaipur: '3 Days / 2 Nights',
    udaipur: '4 Days / 3 Nights',
    alleppey: '4 Days / 3 Nights',
    munnar: '4 Days / 3 Nights',
    'north-goa': '4 Days / 3 Nights',
    'south-goa': '4 Days / 3 Nights',
    leh: '5 Days / 4 Nights',
    srinagar: '5 Days / 4 Nights',
    varanasi: '3 Days / 2 Nights',
    agra: '2 Days / 1 Night',
    bali: '5 Days / 4 Nights',
    singapore: '4 Days / 3 Nights',
    dubai: '4 Days / 3 Nights'
  };

  function slug(value) {
    return String(value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  const usedIds = new Set();

  function D(name, state, country, region, type, price, rating, best, blurb, s1, s2, s3, extraTag) {
    let id = slug(name);
    if (usedIds.has(id)) id = id + '-' + slug(state);
    usedIds.add(id);
    const sights = [s1, s2, s3].filter(Boolean);
    const destType = (country === 'India') ? 'domestic' : 'international';
    return {
      id: id,
      name: name,
      state: state,
      country: country,
      region: region,
      type: type,
      destinationType: destType,
      image: DEST_IMAGES[id] || IMAGE[TYPE_IMAGE[type] || 'mountains'],
      shortDescription: blurb,
      longDescription: blurb + ' ' + (TYPE_INTRO[type] || '') + ' Use ' + name + ' as your base and keep time for ' + sights[0] + ' and ' + sights[1] + '.',
      duration: DURATION_BY_ID[id] || DURATION[type] || '4 Days / 3 Nights',
      startingPrice: price,
      rating: rating,
      bestTime: best,
      highlights: sights,
      tags: [type].concat(extraTag ? [extraTag] : []),
      badgeClass: TYPE_BADGE[type] || 'badge-nature',
      travelTips: TYPE_TIPS[type] || TYPE_TIPS.Nature
    };
  }

  function I(name, state, country, region, type, price, rating, best, blurb, s1, s2, s3, extraTag) {
    return D(name, state, country, region, type, price, rating, best, blurb, s1, s2, s3, extraTag);
  }

  const destinations = [];

  destinations.push(
    D('Visakhapatnam', 'Andhra Pradesh', 'India', 'South India', 'Beaches', 12900, 4.6, 'October – March', 'A lively Bay of Bengal city where long beaches meet green hills and a strong coastal food culture.', 'RK Beach promenade', 'Kailasagiri viewpoints', 'Araku Valley day trip', 'Family'),
    D('Araku Valley', 'Andhra Pradesh', 'India', 'South India', 'Nature', 11400, 4.7, 'October – February', 'Coffee plantations, red-earth roads and tribal culture make this Eastern Ghats valley a slow, scenic escape.', 'Borra Caves', 'Coffee estate walks', 'Ananthagiri viewpoints'),
    D('Tirupati', 'Andhra Pradesh', 'India', 'South India', 'Spiritual', 9900, 4.8, 'September – February', 'One of India’s most visited pilgrimage centres, with the Tirumala hills rising above the temple town.', 'Tirumala Temple', 'Kapila Theertham', 'Chandragiri Fort', 'Cultural'),
    D('Vijayawada', 'Andhra Pradesh', 'India', 'South India', 'Heritage', 8900, 4.4, 'October – February', 'A Krishna river city of ancient cave temples, busy markets and easy access to the Andhra coast.', 'Kanaka Durga Temple', 'Undavalli Caves', 'Bhavani Island'),

    D('Tawang', 'Arunachal Pradesh', 'India', 'North-East India', 'Mountains', 24900, 4.8, 'March – October', 'A high-altitude monastery town framed by snow peaks, prayer flags and the dramatic Sela Pass route.', 'Tawang Monastery', 'Sela Pass', 'Madhuri Lake', 'Adventure'),
    D('Ziro Valley', 'Arunachal Pradesh', 'India', 'North-East India', 'Nature', 21900, 4.7, 'March – October', 'Emerald rice fields, pine-covered ridges and the distinctive bamboo homes of the Apatani villages.', 'Apatani villages', 'Talley Valley', 'Kile Pakho viewpoint'),
    D('Bomdila', 'Arunachal Pradesh', 'India', 'North-East India', 'Mountains', 18900, 4.5, 'March – October', 'A quiet hill town with monastery views, apple orchards and a welcome pause on the road to Tawang.', 'Bomdila Monastery', 'Apple orchards', 'Dirang Valley'),
    D('Dirang', 'Arunachal Pradesh', 'India', 'North-East India', 'Nature', 19900, 4.6, 'March – October', 'A valley of hot springs, yak pastures and old stone forts beneath the eastern Himalayan foothills.', 'Dirang Dzong', 'Sangti Valley', 'Dirang hot springs'),

    D('Guwahati', 'Assam', 'India', 'North-East India', 'City', 10900, 4.5, 'October – March', 'The gateway to the northeast, set beside the Brahmaputra and anchored by the hilltop Kamakhya Temple.', 'Kamakhya Temple', 'Umananda Island', 'Assam State Museum', 'Cultural'),
    D('Kaziranga', 'Assam', 'India', 'North-East India', 'Wildlife', 15900, 4.8, 'November – April', 'Grasslands and floodplain forest shelter the world’s largest population of greater one-horned rhinos.', 'Central Range jeep safari', 'Elephant-back safari', 'Tea estate visit', 'Family'),
    D('Majuli', 'Assam', 'India', 'North-East India', 'Nature', 13900, 4.7, 'October – March', 'A river island of satras, mask makers and quiet bicycle rides along the Brahmaputra.', 'Kamalabari Satra', 'Mask-making village', 'Brahmaputra sunset', 'Cultural'),
    D('Manas', 'Assam', 'India', 'North-East India', 'Wildlife', 14900, 4.6, 'November – April', 'A UNESCO-listed national park on the Bhutan border, known for rare species and unspoiled riverine forest.', 'Manas jeep safari', 'Manas River', 'Bodo village visit'),

    D('Bodh Gaya', 'Bihar', 'India', 'East India', 'Spiritual', 9900, 4.7, 'October – March', 'The place of the Buddha’s enlightenment, with the Mahabodhi Temple and a calm international monastic community.', 'Mahabodhi Temple', 'Bodhi Tree', 'Great Buddha Statue', 'Cultural'),
    D('Rajgir', 'Bihar', 'India', 'East India', 'Heritage', 8900, 4.4, 'October – March', 'An ancient capital ringed by hills, with Buddhist stupas, hot springs and a peaceful ropeway climb.', 'Vishwa Shanti Stupa', 'Griddhakuta Hill', 'Brahmakund hot springs'),
    D('Nalanda', 'Bihar', 'India', 'East India', 'Heritage', 8900, 4.6, 'October – March', 'The excavated ruins of one of the world’s oldest universities, set among lawns and red-brick monasteries.', 'Nalanda ruins', 'Nalanda Museum', 'Xuanzang Memorial'),
    D('Patna', 'Bihar', 'India', 'East India', 'City', 7900, 4.2, 'October – March', 'A historic Ganges city with colonial landmarks, Sikh heritage and a lively street-food scene.', 'Golghar', 'Patna Museum', 'Takht Sri Patna Sahib'),

    D('Raipur', 'Chhattisgarh', 'India', 'Central India', 'City', 7900, 4.3, 'October – February', 'A practical central-India base with museums, craft markets and easy access to Bastar’s forests.', 'Purkhouti Muktangan', 'Mahant Ghasidas Museum', 'Nandan Van zoo', 'Family'),
    D('Jagdalpur', 'Chhattisgarh', 'India', 'Central India', 'Nature', 10900, 4.5, 'October – March', 'The cultural heart of Bastar, surrounded by waterfalls, sal forests and distinctive tribal craft traditions.', 'Chitrakote Falls', 'Bastar Palace', 'Anthropological Museum', 'Cultural'),
    D('Chitrakote', 'Chhattisgarh', 'India', 'Central India', 'Nature', 11900, 4.7, 'July – February', 'A wide horseshoe waterfall on the Indravati river, best seen in monsoon when the flow is at its fullest.', 'Chitrakote Falls', 'Tirathgarh Falls', 'Kanger Valley National Park'),
    D('Mainpat', 'Chhattisgarh', 'India', 'Central India', 'Nature', 9900, 4.4, 'October – February', 'A cool plateau of Tibetan settlements, tea gardens and sweeping valley viewpoints.', 'Mainpat viewpoint', 'Tibetan monastery', 'Fish Point'),

    D('North Goa', 'Goa', 'India', 'West India', 'Beaches', 14900, 4.7, 'November – February', 'A lively strip of sand, sea forts, beach shacks and markets that suits travellers who like to stay busy.', 'Baga and Calangute', 'Fort Aguada', 'Anjuna flea market', 'Family'),
    D('South Goa', 'Goa', 'India', 'West India', 'Beaches', 15900, 4.6, 'November – February', 'Quieter beaches, whitewashed churches and palm-lined lanes make this the more restful side of Goa.', 'Palolem Beach', 'Cabo de Rama Fort', 'Colva Beach', 'Romantic'),
    D('Panaji', 'Goa', 'India', 'West India', 'City', 12900, 4.5, 'November – February', 'Goa’s capital blends a Portuguese-era Latin quarter with riverfront walks, galleries and great local food.', 'Fontainhas quarter', 'Miramar promenade', 'Old Goa churches', 'Cultural'),
    D('Palolem', 'Goa', 'India', 'West India', 'Beaches', 13900, 4.7, 'November – February', 'A crescent of soft sand and calm water, with kayaking, beach cafes and a relaxed south-coast atmosphere.', 'Palolem Beach', 'Butterfly Beach', 'Cotigao Wildlife Sanctuary', 'Romantic'),

    D('Ahmedabad', 'Gujarat', 'India', 'West India', 'City', 9900, 4.5, 'November – February', 'A UNESCO World Heritage city of pols, stepwells, textile traditions and an exceptionally good food scene.', 'Sabarmati Ashram', 'Adalaj Stepwell', 'Old City heritage walk', 'Cultural'),
    D('Kutch', 'Gujarat', 'India', 'West India', 'Heritage', 14900, 4.7, 'November – February', 'The white salt desert, embroidered textiles and craft villages of Kutch are at their best during Rann Utsav.', 'White Rann', 'Bhuj heritage sites', 'Artisan villages', 'Cultural'),
    D('Gir National Park', 'Gujarat', 'India', 'West India', 'Wildlife', 16900, 4.8, 'December – March', 'The last wild home of the Asiatic lion, with dry deciduous forest, jeep trails and quiet forest lodges.', 'Lion safari', 'Devalia enclosure', 'Kamleshwar Dam', 'Family'),
    D('Somnath', 'Gujarat', 'India', 'West India', 'Spiritual', 8900, 4.6, 'October – March', 'A Jyotirlinga temple town on the Arabian Sea, where evening aarti is accompanied by the sound of waves.', 'Somnath Temple', 'Triveni Sangam', 'Bhalka Tirth', 'Cultural'),
    D('Dwarka', 'Gujarat', 'India', 'West India', 'Spiritual', 9900, 4.6, 'October – March', 'One of India’s great Krishna pilgrimage sites, with a coastal temple, island crossings and quiet beaches.', 'Dwarkadhish Temple', 'Bet Dwarka', 'Nageshwar Jyotirlinga', 'Cultural'),
    D('Statue of Unity', 'Gujarat', 'India', 'West India', 'Heritage', 8900, 4.5, 'October – March', 'A landmark tribute to Sardar Patel, with a viewing gallery, riverside trails and a sound-and-light show.', 'Statue of Unity', 'Valley of Flowers', 'Sardar Sarovar Dam', 'Family'),

    D('Gurugram', 'Haryana', 'India', 'North India', 'City', 7900, 4.2, 'October – March', 'A fast-growing urban centre with contemporary dining, shopping and quick escapes into the Aravalli foothills.', 'Cyber Hub', 'Sultanpur Bird Sanctuary', 'Sheetala Mata Temple'),
    D('Kurukshetra', 'Haryana', 'India', 'North India', 'Spiritual', 7900, 4.4, 'October – March', 'A landscape steeped in Mahabharata tradition, centred on sacred tanks, temples and a well-kept museum.', 'Brahma Sarovar', 'Jyotisar', 'Krishna Museum', 'Cultural'),
    D('Panchkula', 'Haryana', 'India', 'North India', 'Nature', 7900, 4.2, 'October – March', 'A green planned city at the edge of the Shivaliks, useful as a base for Morni Hills and Pinjore.', 'Yavnika Garden', 'Morni Hills', 'Pinjore Gardens', 'Family'),
    D('Morni Hills', 'Haryana', 'India', 'North India', 'Nature', 8900, 4.4, 'September – March', 'A low-key hill escape of quiet roads, forest trails and two small lakes overlooking the plains.', 'Morni Fort', 'Tikkar Taal', 'Himalayan viewpoints'),

    D('Shimla', 'Himachal Pradesh', 'India', 'North India', 'Mountains', 11900, 4.6, 'March – June and September – November', 'The former summer capital still charms with colonial architecture, a lively mall and deodar-covered ridges.', 'Mall Road', 'Jakhoo Temple', 'Kufri', 'Family'),
    D('Manali', 'Himachal Pradesh', 'India', 'North India', 'Mountains', 8900, 4.8, 'March – June and October – February', 'An alpine valley of pine forest, riverside cafes and adventure sports, with Solang Valley close at hand.', 'Solang Valley', 'Hadimba Temple', 'Old Manali cafes', 'Family'),
    D('Dharamshala', 'Himachal Pradesh', 'India', 'North India', 'Mountains', 10900, 4.7, 'March – June and September – November', 'A mountain town shaped by Tibetan culture, monastery life and some of the clearest Dhauladhar views in India.', 'McLeod Ganj', 'Tsuglagkhang Complex', 'Triund trek', 'Cultural'),
    D('Dalhousie', 'Himachal Pradesh', 'India', 'North India', 'Mountains', 10900, 4.6, 'March – June and September – November', 'A small colonial-era hill station of pine slopes, quiet promenades and day trips to the meadows of Khajjiar.', 'Khajjiar', 'Dainkund Peak', 'Panchpula', 'Romantic'),
    D('Kasol', 'Himachal Pradesh', 'India', 'North India', 'Adventure', 9900, 4.5, 'April – June and September – October', 'A Parvati Valley base for riverside walks, short treks and cafe culture in the pine woods.', 'Parvati River', 'Chalal village', 'Manikaran hot springs'),
    D('Spiti Valley', 'Himachal Pradesh', 'India', 'North India', 'Adventure', 24900, 4.9, 'June – September', 'A cold desert of high passes, cliffside monasteries and tiny villages that feels like another world.', 'Key Monastery', 'Chandratal Lake', 'Hikkim post office', 'Cultural'),
    D('Kinnaur', 'Himachal Pradesh', 'India', 'North India', 'Mountains', 21900, 4.7, 'May – October', 'Apple orchards, the Sutlej gorge and close-up views of Kinner Kailash define this high Himalayan district.', 'Kalpa', 'Chitkul', 'Nako village', 'Adventure'),

    D('Ranchi', 'Jharkhand', 'India', 'East India', 'Nature', 8900, 4.3, 'October – March', 'A plateau capital surrounded by waterfalls, sal forest and tribal heritage, with an easy-going pace.', 'Dassam Falls', 'Hundru Falls', 'Ranchi Lake', 'Family'),
    D('Netarhat', 'Jharkhand', 'India', 'East India', 'Nature', 9900, 4.5, 'October – March', 'A quiet hill plateau known for sunrise views, pine-lined roads and cool evenings above the Chota Nagpur plains.', 'Netarhat sunrise point', 'Magnolia Point', 'Lodh Falls'),
    D('Deoghar', 'Jharkhand', 'India', 'East India', 'Spiritual', 7900, 4.5, 'October – March', 'A major Shiva pilgrimage town, home to the Baidyanath Temple and a steady rhythm of festivals and local markets.', 'Baidyanath Temple', 'Basukinath', 'Trikut Hills', 'Cultural'),
    D('Jamshedpur', 'Jharkhand', 'India', 'East India', 'City', 7900, 4.2, 'October – March', 'A planned industrial city with generous parks, a lake and the wooded Dalma Hills on its doorstep.', 'Jubilee Park', 'Dimna Lake', 'Dalma Hills', 'Family'),

    D('Bengaluru', 'Karnataka', 'India', 'South India', 'City', 8900, 4.4, 'October – February', 'A relaxed metro of leafy gardens, independent cafes, craft breweries and a year-round pleasant climate.', 'Lalbagh', 'Cubbon Park', 'Bangalore Palace', 'Family'),
    D('Mysuru', 'Karnataka', 'India', 'South India', 'Heritage', 9900, 4.7, 'October – February', 'A graceful royal city of palace facades, sandalwood, silk and the illuminated Brindavan Gardens.', 'Mysore Palace', 'Chamundi Hill', 'Brindavan Gardens', 'Cultural'),
    D('Coorg', 'Karnataka', 'India', 'South India', 'Nature', 12900, 4.7, 'October – March', 'Coffee country at its most photogenic: misty plantations, spice gardens, waterfalls and slow estate stays.', 'Abbey Falls', 'Raja’s Seat', 'Coffee estate walks', 'Romantic'),
    D('Hampi', 'Karnataka', 'India', 'South India', 'Heritage', 9900, 4.8, 'October – February', 'A UNESCO-listed landscape of Vijayanagara ruins, boulder hills and temple courtyards beside the Tungabhadra.', 'Virupaksha Temple', 'Vittala Temple', 'Matanga Hill', 'Cultural'),
    D('Gokarna', 'Karnataka', 'India', 'South India', 'Beaches', 9900, 4.6, 'November – February', 'A temple town that doubles as a laid-back beach stop, with cliff paths linking quiet coves.', 'Om Beach', 'Mahabaleshwar Temple', 'Kudle Beach', 'Romantic'),
    D('Chikmagalur', 'Karnataka', 'India', 'South India', 'Nature', 11900, 4.6, 'September – March', 'Coffee hills, winding ghat roads and estate stays make this a favourite long-weekend escape.', 'Mullayanagiri', 'Baba Budangiri', 'Hebbe Falls', 'Adventure'),
    D('Udupi', 'Karnataka', 'India', 'South India', 'Spiritual', 8900, 4.4, 'October – March', 'A temple town and coastal food capital, with a famous Krishna shrine and easy access to quiet beaches.', 'Udupi Krishna Temple', 'Malpe Beach', 'St Mary’s Island', 'Family'),

    D('Kochi', 'Kerala', 'India', 'South India', 'Heritage', 10900, 4.6, 'October – March', 'A harbour city of colonial lanes, art spaces, spice markets and the iconic Chinese fishing nets.', 'Fort Kochi', 'Mattancherry', 'Chinese fishing nets', 'Cultural'),
    D('Munnar', 'Kerala', 'India', 'South India', 'Nature', 11900, 4.8, 'September – March', 'Rolling tea estates, misty viewpoints and high-altitude wildlife make Munnar the classic Kerala hill escape.', 'Eravikulam National Park', 'Top Station', 'Tea Museum', 'Romantic'),
    D('Alleppey', 'Kerala', 'India', 'South India', 'Relaxation', 12900, 4.9, 'September – March', 'The backwater capital, where traditional houseboats drift past paddy fields, canals and small riverside villages.', 'Vembanad Lake', 'Alappuzha Beach', 'Village canals', 'Romantic'),
    D('Wayanad', 'Kerala', 'India', 'South India', 'Nature', 11900, 4.7, 'October – March', 'A green district of forest trails, ancient caves, spice farms and waterfalls along the Western Ghats.', 'Edakkal Caves', 'Banasura Sagar Dam', 'Soochipara Falls', 'Family'),
    D('Varkala', 'Kerala', 'India', 'South India', 'Beaches', 10900, 4.6, 'November – February', 'A red-cliff coastline with a long beach, clifftop cafes and a temple town just behind the sand.', 'Varkala Cliff', 'Papanasam Beach', 'Janardanaswamy Temple', 'Romantic'),
    D('Kovalam', 'Kerala', 'India', 'South India', 'Beaches', 10900, 4.5, 'November – February', 'A crescent-shaped beach town with a lighthouse, calm coves and easy access to Trivandrum.', 'Lighthouse Beach', 'Hawa Beach', 'Padmanabhaswamy Temple', 'Family'),
    D('Thekkady', 'Kerala', 'India', 'South India', 'Wildlife', 11900, 4.7, 'September – March', 'Periyar’s forested hills, spice gardens and boat safaris offer a slower, greener side of Kerala.', 'Periyar boat safari', 'Spice gardens', 'Bamboo rafting', 'Family'),

    D('Bhopal', 'Madhya Pradesh', 'India', 'Central India', 'City', 8900, 4.4, 'October – March', 'A lake city of mosques, museums and wide boulevards, with prehistoric Bhimbetka within easy reach.', 'Upper Lake', 'Taj-ul-Masajid', 'Bhimbetka day trip', 'Cultural'),
    D('Indore', 'Madhya Pradesh', 'India', 'Central India', 'City', 8900, 4.5, 'October – March', 'Central India’s food capital, with royal palaces, bustling bazaars and a famously energetic street-food scene.', 'Rajwada Palace', 'Sarafa Bazaar', 'Lal Bagh Palace', 'Family'),
    D('Ujjain', 'Madhya Pradesh', 'India', 'Central India', 'Spiritual', 8900, 4.7, 'October – March', 'An ancient city on the Shipra, home to the Mahakaleshwar Jyotirlinga and a dense cluster of ghats and temples.', 'Mahakaleshwar Temple', 'Ram Ghat', 'Kal Bhairav Temple', 'Cultural'),
    D('Khajuraho', 'Madhya Pradesh', 'India', 'Central India', 'Heritage', 9900, 4.8, 'October – March', 'A UNESCO-listed temple complex celebrated for its intricate stone sculpture and evening light show.', 'Western Group temples', 'Kandariya Mahadev', 'Light and sound show', 'Cultural'),
    D('Pachmarhi', 'Madhya Pradesh', 'India', 'Central India', 'Nature', 10900, 4.6, 'October – June', 'The Satpura hills’ best-known hill station, with waterfalls, cave shelters and forest viewpoints.', 'Bee Falls', 'Pandav Caves', 'Dhoopgarh', 'Family'),
    D('Gwalior', 'Madhya Pradesh', 'India', 'Central India', 'Heritage', 8900, 4.6, 'October – March', 'A hilltop fort, ornate palaces and a deep musical heritage make Gwalior one of central India’s great historic stops.', 'Gwalior Fort', 'Jai Vilas Palace', 'Sas-Bahu Temples', 'Cultural'),
    D('Orchha', 'Madhya Pradesh', 'India', 'Central India', 'Heritage', 8900, 4.5, 'October – March', 'A small riverside town of palaces, cenotaphs and temples that rewards unhurried walking.', 'Orchha Fort', 'Ram Raja Temple', 'Betwa river walk', 'Romantic'),

    D('Mumbai', 'Maharashtra', 'India', 'West India', 'City', 9900, 4.5, 'November – February', 'India’s most energetic city, with a dramatic coastline, art deco streets, street food and endless neighbourhoods.', 'Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Family'),
    D('Pune', 'Maharashtra', 'India', 'West India', 'City', 8900, 4.4, 'October – February', 'A university city of Maratha history, leafy cafes and quick access to the Sahyadri hills.', 'Shaniwar Wada', 'Aga Khan Palace', 'Sinhagad Fort', 'Cultural'),
    D('Lonavala', 'Maharashtra', 'India', 'West India', 'Nature', 8900, 4.5, 'June – September and December – February', 'A monsoon favourite of waterfalls, old hill forts and viewpoints along the Mumbai–Pune road.', 'Bhushi Dam', 'Karla Caves', 'Tiger Point', 'Family'),
    D('Mahabaleshwar', 'Maharashtra', 'India', 'West India', 'Nature', 9900, 4.6, 'October – June', 'Strawberry farms, misty valleys and colonial-era viewpoints make this a classic Western Ghats break.', 'Arthur’s Seat', 'Venna Lake', 'Pratapgad Fort', 'Romantic'),
    D('Nashik', 'Maharashtra', 'India', 'West India', 'Spiritual', 8900, 4.4, 'October – March', 'A temple city on the Godavari that has also become one of India’s best-known wine regions.', 'Trimbakeshwar', 'Panchvati', 'Sula Vineyards', 'Cultural'),
    D('Chhatrapati Sambhajinagar', 'Maharashtra', 'India', 'West India', 'Heritage', 8900, 4.5, 'October – March', 'A base for the Ellora caves, Daulatabad fort and the Mughal-era Bibi Ka Maqbara.', 'Ellora Caves', 'Bibi Ka Maqbara', 'Daulatabad Fort', 'Cultural'),
    D('Alibaug', 'Maharashtra', 'India', 'West India', 'Beaches', 9900, 4.5, 'November – February', 'A breezy coastal escape from Mumbai, with beaches, sea forts and ferry rides across the harbour.', 'Alibaug Beach', 'Murud-Janjira', 'Kolaba Fort', 'Family'),
    D('Ratnagiri', 'Maharashtra', 'India', 'West India', 'Beaches', 9900, 4.5, 'November – February', 'The Konkan coast at its most unhurried, with mango orchards, temples and quiet stretches of sand.', 'Ganpatipule', 'Ratnagiri Fort', 'Thibaw Palace'),

    D('Imphal', 'Manipur', 'India', 'North-East India', 'Heritage', 13900, 4.5, 'October – March', 'A valley capital of royal history, lively markets and classical Manipuri dance, with Loktak Lake nearby.', 'Kangla Fort', 'Ima Keithel market', 'Loktak Lake day trip', 'Cultural'),
    D('Loktak Lake', 'Manipur', 'India', 'North-East India', 'Nature', 14900, 4.7, 'October – March', 'A vast freshwater lake dotted with floating phumdis and the unique Keibul Lamjao national park.', 'Loktak Lake', 'Keibul Lamjao', 'Sendra island', 'Family'),
    D('Ukhrul', 'Manipur', 'India', 'North-East India', 'Nature', 15900, 4.6, 'October – April', 'A highland district of Tangkhul villages, pine ridges and the rare Shirui lily.', 'Shirui Hills', 'Khayang Peak', 'Tangkhul villages'),

    D('Shillong', 'Meghalaya', 'India', 'North-East India', 'Nature', 12900, 4.6, 'October – April', 'A music-loving hill capital of lakes, waterfalls and colonial-era charm, surrounded by pine forest.', 'Umiam Lake', 'Elephant Falls', 'Police Bazaar', 'Family'),
    D('Cherrapunji', 'Meghalaya', 'India', 'North-East India', 'Nature', 13900, 4.7, 'June – October and November – February', 'One of the wettest places on earth, with dramatic waterfalls, limestone caves and cloud-wrapped cliffs.', 'Nohkalikai Falls', 'Seven Sisters Falls', 'Mawsmai Caves'),
    D('Dawki', 'Meghalaya', 'India', 'North-East India', 'Nature', 12900, 4.7, 'October – April', 'The Umngot river runs so clear that boats appear to float above the riverbed, with quiet camping nearby.', 'Umngot River', 'Shnongpdeng', 'Tamabil viewpoint', 'Adventure'),
    D('Mawlynnong', 'Meghalaya', 'India', 'North-East India', 'Nature', 11900, 4.6, 'October – April', 'A small, immaculately kept village known for its living root bridge and community-led tourism.', 'Living Root Bridge', 'Mawlynnong village', 'Bangladesh view point', 'Family'),

    D('Aizawl', 'Mizoram', 'India', 'North-East India', 'City', 13900, 4.5, 'October – March', 'A hillside capital with wide views, church spires and a warm Mizo cultural scene.', 'Durtlang Hills', 'Mizoram State Museum', 'Bara Bazar', 'Cultural'),
    D('Champhai', 'Mizoram', 'India', 'North-East India', 'Nature', 14900, 4.4, 'October – March', 'A border town of vineyards, rolling hills and quiet roads looking toward the Myanmar ranges.', 'Champhai vineyards', 'Rih Dil', 'Murlen National Park'),
    D('Reiek', 'Mizoram', 'India', 'North-East India', 'Nature', 13900, 4.6, 'October – March', 'A dramatic peak and traditional village just outside Aizawl, ideal for a short hill walk and cultural stop.', 'Reiek Tlang', 'Reiek village', 'Mizo cultural show'),

    D('Kohima', 'Nagaland', 'India', 'North-East India', 'Heritage', 14900, 4.6, 'October – April', 'A hill capital of war history, tribal heritage and the famous Hornbill Festival held nearby.', 'Kohima War Cemetery', 'Kisama Heritage Village', 'Kohima Cathedral', 'Cultural'),
    D('Dzukou Valley', 'Nagaland', 'India', 'North-East India', 'Adventure', 16900, 4.8, 'June – September and October – November', 'A high, bowl-shaped valley of rolling grassland and seasonal flowers, reached by a rewarding trek.', 'Dzukou Valley trek', 'Japfu Peak', 'Viswema village'),
    D('Mon', 'Nagaland', 'India', 'North-East India', 'Heritage', 15900, 4.5, 'October – April', 'A remote district of Konyak villages, traditional longhouses and some of the region’s most distinctive culture.', 'Longwa village', 'Shangnyu village', 'Angh’s palace', 'Cultural'),

    D('Bhubaneswar', 'Odisha', 'India', 'East India', 'Heritage', 8900, 4.5, 'October – February', 'The temple city of Odisha, with ancient shrines, Buddhist caves and a strong handloom and craft scene.', 'Lingaraj Temple', 'Udayagiri Caves', 'Odisha State Museum', 'Cultural'),
    D('Puri', 'Odisha', 'India', 'East India', 'Spiritual', 8900, 4.7, 'October – February', 'A coastal pilgrimage town centred on the Jagannath Temple, with a broad beach and lively local markets.', 'Jagannath Temple', 'Puri Beach', 'Raghurajpur craft village', 'Cultural'),
    D('Konark', 'Odisha', 'India', 'East India', 'Heritage', 8900, 4.7, 'October – February', 'The Sun Temple’s stone chariot is one of India’s most extraordinary monuments, set close to the coast.', 'Sun Temple', 'Chandrabhaga Beach', 'Ramachandi Temple', 'Cultural'),
    D('Chilika Lake', 'Odisha', 'India', 'East India', 'Nature', 9900, 4.6, 'November – February', 'Asia’s largest brackish lagoon, with dolphin-watching boat trips and vast winter bird gatherings.', 'Dolphin point', 'Kalijai Temple', 'Mangalajodi wetlands', 'Family'),
    D('Gopalpur', 'Odisha', 'India', 'East India', 'Beaches', 8900, 4.4, 'November – February', 'A quiet colonial-era beach town with a long shoreline, lighthouse views and fresh seafood.', 'Gopalpur Beach', 'Tampara Lake', 'Berhampur markets', 'Family'),

    D('Amritsar', 'Punjab', 'India', 'North India', 'Spiritual', 8900, 4.8, 'October – March', 'The Golden Temple, the langar kitchen and the Wagah border ceremony make Amritsar an unforgettable stop.', 'Golden Temple', 'Jallianwala Bagh', 'Wagah border ceremony', 'Cultural'),
    D('Ludhiana', 'Punjab', 'India', 'North India', 'City', 7900, 4.1, 'October – March', 'A busy Punjab city with a strong food culture, colonial-era landmarks and easy rail connections.', 'Lodhi Fort', 'Punjab Agricultural University', 'Nehru Rose Garden', 'Family'),
    D('Patiala', 'Punjab', 'India', 'North India', 'Heritage', 7900, 4.3, 'October – March', 'A royal city of palaces, gardens and the unmistakable Patiala peg, with a relaxed old-world feel.', 'Qila Mubarak', 'Sheesh Mahal', 'Baradari Gardens', 'Cultural'),
    D('Anandpur Sahib', 'Punjab', 'India', 'North India', 'Spiritual', 7900, 4.5, 'October – March', 'A significant Sikh heritage town beside the Sutlej, home to Takht Sri Keshgarh Sahib and Virasat-e-Khalsa.', 'Takht Sri Keshgarh Sahib', 'Virasat-e-Khalsa', 'Naina Devi', 'Cultural'),

    D('Jaipur', 'Rajasthan', 'India', 'West India', 'Heritage', 7900, 4.8, 'October – March', 'The Pink City balances grand forts, royal palaces and some of India’s best craft shopping and street food.', 'Amber Fort', 'Hawa Mahal', 'City Palace', 'Cultural'),
    D('Udaipur', 'Rajasthan', 'India', 'West India', 'Romantic', 11900, 4.9, 'September – March', 'A lake city of white palaces, rooftop cafes and sunset boat rides that lives up to its romantic reputation.', 'Lake Pichola', 'City Palace', 'Sajjangarh Palace', 'Luxury'),
    D('Jaisalmer', 'Rajasthan', 'India', 'West India', 'Heritage', 10900, 4.7, 'November – February', 'A golden sandstone fort rising from the Thar desert, with havelis, camel safaris and starry dunes nearby.', 'Jaisalmer Fort', 'Sam Sand Dunes', 'Patwon Ki Haveli', 'Adventure'),
    D('Jodhpur', 'Rajasthan', 'India', 'West India', 'Heritage', 9900, 4.7, 'October – March', 'The Blue City is watched over by Mehrangarh Fort, with a maze of markets and rooftops below.', 'Mehrangarh Fort', 'Jaswant Thada', 'Clock Tower market', 'Cultural'),
    D('Mount Abu', 'Rajasthan', 'India', 'West India', 'Nature', 8900, 4.4, 'October – March', 'Rajasthan’s only hill station, with a quiet lake, Dilwara temples and cool evenings above the desert plains.', 'Nakki Lake', 'Dilwara Temples', 'Guru Shikhar', 'Family'),
    D('Pushkar', 'Rajasthan', 'India', 'West India', 'Spiritual', 7900, 4.5, 'October – March', 'A small lake town of ghats, temples and the famous camel fair, with a distinctly relaxed atmosphere.', 'Pushkar Lake', 'Brahma Temple', 'Savitri Hill', 'Cultural'),
    D('Bikaner', 'Rajasthan', 'India', 'West India', 'Heritage', 8900, 4.5, 'November – February', 'A desert city of imposing forts, ornate havelis and a legendary snack culture.', 'Junagarh Fort', 'Karni Mata Temple', 'Camel breeding farm', 'Cultural'),
    D('Ranthambore', 'Rajasthan', 'India', 'West India', 'Wildlife', 12900, 4.8, 'October – April', 'A former royal hunting ground where tigers move among dry forest, lakes and a dramatic hilltop fort.', 'Tiger safari', 'Ranthambore Fort', 'Padam Talao', 'Family'),

    D('Gangtok', 'Sikkim', 'India', 'North-East India', 'Mountains', 14900, 4.7, 'March – June and October – December', 'Sikkim’s lively capital pairs monastery mornings with a walkable mall, mountain views and day trips to glacial lakes.', 'MG Marg', 'Rumtek Monastery', 'Tsomgo Lake', 'Family'),
    D('Pelling', 'Sikkim', 'India', 'North-East India', 'Mountains', 13900, 4.6, 'March – May and October – December', 'A quiet ridge town with some of the closest views of Kanchenjunga, plus monasteries and old palace ruins.', 'Kanchenjunga views', 'Pemayangtse Monastery', 'Rabdentse Ruins', 'Romantic'),
    D('Lachung', 'Sikkim', 'India', 'North-East India', 'Mountains', 17900, 4.7, 'March – June and September – November', 'A high valley village of wooden houses and waterfalls, used as a base for the flower-filled Yumthang meadows.', 'Yumthang Valley', 'Zero Point', 'Lachung Monastery', 'Adventure'),
    D('Ravangla', 'Sikkim', 'India', 'North-East India', 'Nature', 12900, 4.5, 'March – June and October – November', 'A small, peaceful town of rhododendron trails, monasteries and wide Himalayan panoramas.', 'Buddha Park', 'Ralang Monastery', 'Maenam Hill'),

    D('Chennai', 'Tamil Nadu', 'India', 'South India', 'City', 8900, 4.3, 'November – February', 'A coastal metropolis of colonial landmarks, temple architecture, Carnatic music and a serious filter-coffee culture.', 'Marina Beach', 'Kapaleeshwarar Temple', 'Fort St George', 'Family'),
    D('Madurai', 'Tamil Nadu', 'India', 'South India', 'Spiritual', 8900, 4.7, 'October – March', 'One of India’s oldest living cities, centred on the soaring gopurams and pillared halls of Meenakshi Temple.', 'Meenakshi Temple', 'Thirumalai Nayakkar Mahal', 'Gandhi Museum', 'Cultural'),
    D('Ooty', 'Tamil Nadu', 'India', 'South India', 'Mountains', 10900, 4.6, 'April – June and September – November', 'The Nilgiris’ best-known hill station, with botanical gardens, tea slopes and a heritage mountain railway.', 'Botanical Gardens', 'Doddabetta', 'Nilgiri Mountain Railway', 'Family'),
    D('Kodaikanal', 'Tamil Nadu', 'India', 'South India', 'Nature', 10900, 4.6, 'April – June and September – November', 'A misty lake town of pine forests, cliff walks and cool evenings in the Palani Hills.', 'Kodai Lake', 'Coaker’s Walk', 'Pillar Rocks', 'Romantic'),
    D('Rameswaram', 'Tamil Nadu', 'India', 'South India', 'Spiritual', 9900, 4.6, 'October – March', 'An island pilgrimage town of long temple corridors, the Pamban bridge and windswept views toward Sri Lanka.', 'Ramanathaswamy Temple', 'Pamban Bridge', 'Dhanushkodi', 'Cultural'),
    D('Thanjavur', 'Tamil Nadu', 'India', 'South India', 'Heritage', 8900, 4.6, 'October – March', 'The Chola capital is home to the great Brihadeeswarar Temple, a royal palace and a celebrated art tradition.', 'Brihadeeswarar Temple', 'Thanjavur Palace', 'Saraswathi Mahal Library', 'Cultural'),
    D('Mahabalipuram', 'Tamil Nadu', 'India', 'South India', 'Heritage', 8900, 4.5, 'November – February', 'A Pallava-era shore town of rock-cut temples, monolithic rathas and carvings beside the Bay of Bengal.', 'Shore Temple', 'Pancha Rathas', 'Arjuna’s Penance', 'Family'),

    D('Hyderabad', 'Telangana', 'India', 'South India', 'City', 8900, 4.5, 'October – February', 'A city of pearls, biryani and layered history, from Golconda Fort to the illuminated Charminar.', 'Charminar', 'Golconda Fort', 'Hussain Sagar', 'Family'),
    D('Warangal', 'Telangana', 'India', 'South India', 'Heritage', 7900, 4.4, 'October – March', 'An ancient Kakatiya capital with a dramatic fort gateway, temple ruins and the nearby Ramappa temple.', 'Warangal Fort', 'Thousand Pillar Temple', 'Ramappa Temple', 'Cultural'),
    D('Nagarjuna Sagar', 'Telangana', 'India', 'South India', 'Nature', 8900, 4.4, 'October – February', 'A vast reservoir on the Krishna river, with dam views, waterfalls and important Buddhist archaeological sites.', 'Nagarjuna Sagar Dam', 'Ethipothala Falls', 'Buddhist site'),
    D('Medak', 'Telangana', 'India', 'South India', 'Heritage', 7900, 4.2, 'October – March', 'A quiet district town known for its Gothic cathedral, hilltop fort and easy countryside drives.', 'Medak Cathedral', 'Medak Fort', 'Pocharam Lake'),

    D('Agartala', 'Tripura', 'India', 'North-East India', 'Heritage', 8900, 4.4, 'October – March', 'Tripura’s low-key capital combines royal palaces, a lively market and easy access to the state’s lake palaces.', 'Ujjayanta Palace', 'Neermahal', 'Tripura Sundari Temple', 'Cultural'),
    D('Udaipur', 'Tripura', 'India', 'North-East India', 'Nature', 8900, 4.4, 'October – March', 'A small Tripura town beside Kalyan Sagar lake, best known as the gateway to the water palace of Neermahal.', 'Tripura Sundari Temple', 'Neermahal', 'Kalyan Sagar'),
    D('Unakoti', 'Tripura', 'India', 'North-East India', 'Heritage', 8900, 4.5, 'November – March', 'A hillside archaeological site of enormous rock-cut carvings, set among streams and dense forest.', 'Unakoti carvings', 'Vanghmun', 'Rowa'),

    D('Agra', 'Uttar Pradesh', 'India', 'North India', 'Heritage', 7900, 4.8, 'October – March', 'The Taj Mahal needs no introduction, but Agra also rewards travellers with a great fort and the abandoned city of Fatehpur Sikri.', 'Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Family'),
    D('Varanasi', 'Uttar Pradesh', 'India', 'North India', 'Spiritual', 8900, 4.8, 'October – March', 'One of the world’s oldest continually inhabited cities, where ghats, aarti and narrow lanes run down to the Ganges.', 'Ganga aarti', 'Kashi Vishwanath', 'Sarnath', 'Cultural'),
    D('Lucknow', 'Uttar Pradesh', 'India', 'North India', 'City', 7900, 4.5, 'October – March', 'A city of Awadhi cuisine, ornate imambaras and graceful Nawabi architecture.', 'Bara Imambara', 'Chota Imambara', 'Hazratganj', 'Cultural'),
    D('Ayodhya', 'Uttar Pradesh', 'India', 'North India', 'Spiritual', 7900, 4.6, 'October – March', 'A riverside pilgrimage city on the Saryu, with the Ram Mandir, old ghats and a deeply devotional atmosphere.', 'Ram Mandir', 'Hanuman Garhi', 'Saryu ghats', 'Cultural'),
    D('Mathura', 'Uttar Pradesh', 'India', 'North India', 'Spiritual', 7900, 4.5, 'October – March', 'The birthplace of Krishna, with temple-filled lanes, riverside ghats and a busy calendar of festivals.', 'Krishna Janmabhoomi', 'Dwarkadhish Temple', 'Vishram Ghat', 'Cultural'),
    D('Vrindavan', 'Uttar Pradesh', 'India', 'North India', 'Spiritual', 7900, 4.5, 'October – March', 'A town of Krishna temples, devotional music and colourful celebrations, just across the river from Mathura.', 'Banke Bihari Temple', 'Prem Mandir', 'ISKCON Vrindavan', 'Cultural'),
    D('Sarnath', 'Uttar Pradesh', 'India', 'North India', 'Heritage', 7900, 4.6, 'October – March', 'The deer park where the Buddha gave his first sermon, with stupas, monasteries and an excellent museum.', 'Dhamek Stupa', 'Sarnath Museum', 'Mulagandha Kuti Vihar'),

    D('Rishikesh', 'Uttarakhand', 'India', 'North India', 'Adventure', 9900, 4.7, 'September – June', 'A Ganges-side town of yoga ashrams, suspension bridges and white-water rafting, with the Himalayas close by.', 'Laxman Jhula', 'Triveni Ghat', 'River rafting', 'Family'),
    D('Haridwar', 'Uttarakhand', 'India', 'North India', 'Spiritual', 7900, 4.7, 'October – March', 'One of India’s great pilgrimage cities, where the Ganges leaves the mountains and evening aarti draws crowds to Har Ki Pauri.', 'Har Ki Pauri', 'Mansa Devi Temple', 'Chandi Devi Temple', 'Cultural'),
    D('Nainital', 'Uttarakhand', 'India', 'North India', 'Mountains', 9900, 4.6, 'March – June and September – November', 'A lake town ringed by wooded hills, with boating, a lively mall and cool walks above the water.', 'Naini Lake', 'Snow View Point', 'Naina Devi Temple', 'Family'),
    D('Mussoorie', 'Uttarakhand', 'India', 'North India', 'Mountains', 9900, 4.5, 'March – June and September – November', 'A colonial-era hill station of promenades, waterfalls and wide views over the Doon valley.', 'Mall Road', 'Kempty Falls', 'Gun Hill', 'Family'),
    D('Dehradun', 'Uttarakhand', 'India', 'North India', 'Nature', 8900, 4.4, 'October – March', 'A green valley city with cave walks, forest research campuses and easy access to the lower Himalayas.', 'Robber’s Cave', 'Sahastradhara', 'Forest Research Institute', 'Family'),
    D('Kedarnath', 'Uttarakhand', 'India', 'North India', 'Spiritual', 14900, 4.9, 'May – June and September – October', 'A high Himalayan pilgrimage to one of the twelve Jyotirlingas, reached by a mountain trail beside the Mandakini.', 'Kedarnath Temple', 'Mandakini valley', 'Gaurikund', 'Adventure'),
    D('Valley of Flowers', 'Uttarakhand', 'India', 'North India', 'Nature', 15900, 4.8, 'July – September', 'A UNESCO-listed alpine valley that blooms with wildflowers during the monsoon, reached on a rewarding trek.', 'Valley of Flowers', 'Hemkund Sahib', 'Ghangaria'),
    D('Jim Corbett', 'Uttarakhand', 'India', 'North India', 'Wildlife', 11900, 4.7, 'November – June', 'India’s oldest national park combines riverine forest, grassland and a healthy tiger population with forest lodges.', 'Jeep safari', 'Dhikala zone', 'Corbett Falls', 'Family'),

    D('Kolkata', 'West Bengal', 'India', 'East India', 'City', 8900, 4.5, 'October – March', 'A cultural capital of colonial monuments, trams, bookshops, sweets and a famously passionate food scene.', 'Victoria Memorial', 'Howrah Bridge', 'Park Street', 'Cultural'),
    D('Darjeeling', 'West Bengal', 'India', 'East India', 'Mountains', 11900, 4.7, 'March – May and October – December', 'Tea estates, a heritage toy train and sunrise views of Kanchenjunga make this a classic Himalayan hill escape.', 'Tiger Hill', 'Batasia Loop', 'Happy Valley Tea Estate', 'Family'),
    D('Kalimpong', 'West Bengal', 'India', 'East India', 'Mountains', 10900, 4.5, 'March – June and September – November', 'A quieter hill town of monasteries, flower nurseries and sweeping views over the Teesta valley.', 'Deolo Hill', 'Durpin Monastery', 'Flower nurseries', 'Romantic'),
    D('Sundarbans', 'West Bengal', 'India', 'East India', 'Wildlife', 12900, 4.6, 'November – February', 'The world’s largest mangrove forest, explored by boat through tidal channels in search of tigers and birds.', 'Mangrove boat safari', 'Sajnekhali', 'Dobanki'),
    D('Shantiniketan', 'West Bengal', 'India', 'East India', 'Heritage', 7900, 4.4, 'October – March', 'Rabindranath Tagore’s university town, with art, music, handicrafts and a distinctly unhurried rural rhythm.', 'Visva-Bharati', 'Tagore’s home', 'Amar Kutir', 'Cultural'),
    D('Digha', 'West Bengal', 'India', 'East India', 'Beaches', 7900, 4.2, 'November – February', 'A long, accessible beach town with a broad promenade and easy weekend appeal from Kolkata.', 'Digha Beach', 'Amarabati Park', 'Shankarpur', 'Family'),
    D('Kurseong', 'West Bengal', 'India', 'East India', 'Nature', 9900, 4.5, 'March – May and October – December', 'A small tea-town stop between Siliguri and Darjeeling, with forest walks and quiet ridge views.', 'Tea gardens', 'Eagle’s Crag', 'Batasia Loop'),

    D('Port Blair', 'Andaman & Nicobar Islands', 'India', 'Islands', 'Beaches', 14900, 4.6, 'November – March', 'The Andaman capital pairs a moving colonial history with coral beaches and ferries to the outer islands.', 'Cellular Jail', 'Corbyn’s Cove', 'Ross Island', 'Family'),
    D('Havelock Island', 'Andaman & Nicobar Islands', 'India', 'Islands', 'Beaches', 16900, 4.8, 'November – March', 'Home to Radhanagar Beach and some of India’s clearest water, with diving, snorkelling and slow beach days.', 'Radhanagar Beach', 'Elephant Beach', 'Kalapathar Beach', 'Romantic'),
    D('Neil Island', 'Andaman & Nicobar Islands', 'India', 'Islands', 'Beaches', 14900, 4.6, 'November – March', 'A small, laid-back island of shallow lagoons, coral reefs and quiet bicycle rides between beaches.', 'Bharatpur Beach', 'Laxmanpur Beach', 'Natural Bridge'),

    D('Chandigarh', 'Chandigarh', 'India', 'North India', 'City', 7900, 4.4, 'October – March', 'Le Corbusier’s planned city is green, walkable and home to the playful Rock Garden and a calm lake.', 'Rock Garden', 'Sukhna Lake', 'Capitol Complex', 'Family'),

    D('Daman', 'Dadra & Nagar Haveli and Daman & Diu', 'India', 'West India', 'Beaches', 8900, 4.3, 'November – February', 'A small coastal union territory with Portuguese-era forts, quiet beaches and a relaxed seaside pace.', 'Devka Beach', 'Fort St Jerome', 'Jampore Beach', 'Family'),
    D('Diu', 'Dadra & Nagar Haveli and Daman & Diu', 'India', 'West India', 'Beaches', 9900, 4.5, 'November – February', 'A island-like coastal town of sea forts, white churches and some of Gujarat’s quietest beaches.', 'Diu Fort', 'Nagoa Beach', 'Naida Caves', 'Romantic'),
    D('Silvassa', 'Dadra & Nagar Haveli and Daman & Diu', 'India', 'West India', 'Nature', 8900, 4.3, 'October – March', 'A green, low-key base for tribal museums, lake gardens and the forested hills of the Western Ghats fringe.', 'Vanganga Lake', 'Tribal Museum', 'Khanvel', 'Family'),

    D('New Delhi', 'Delhi', 'India', 'North India', 'City', 7900, 4.6, 'October – March', 'The capital’s wide avenues, monuments and museums make it an easy first stop for any India itinerary.', 'India Gate', 'Humayun’s Tomb', 'Qutub Minar', 'Family'),
    D('Old Delhi', 'Delhi', 'India', 'North India', 'Heritage', 7900, 4.6, 'October – March', 'A dense, exhilarating maze of Mughal monuments, spice markets and some of the city’s best street food.', 'Red Fort', 'Jama Masjid', 'Chandni Chowk', 'Cultural'),

    D('Srinagar', 'Jammu & Kashmir', 'India', 'North India', 'Mountains', 12900, 4.8, 'April – October', 'Houseboats on Dal Lake, Mughal gardens and snow-lined peaks make Srinagar the heart of a Kashmir holiday.', 'Dal Lake', 'Mughal gardens', 'Shankaracharya Temple', 'Romantic'),
    D('Gulmarg', 'Jammu & Kashmir', 'India', 'North India', 'Mountains', 14900, 4.8, 'December – March and May – September', 'A meadow town in winter and a ski resort in summer, with a gondola rising toward Apharwat Peak.', 'Gulmarg Gondola', 'Apharwat Peak', 'Golf course', 'Adventure'),
    D('Pahalgam', 'Jammu & Kashmir', 'India', 'North India', 'Mountains', 12900, 4.7, 'April – October', 'A valley of pine forest, trout streams and meadow day trips along the Lidder river.', 'Betaab Valley', 'Aru Valley', 'Lidder river', 'Family'),
    D('Sonamarg', 'Jammu & Kashmir', 'India', 'North India', 'Mountains', 13900, 4.7, 'May – September', 'The “meadow of gold” is a high base for glacier walks and the dramatic road over Zoji La.', 'Thajiwas Glacier', 'Zoji La', 'Sindh river', 'Adventure'),
    D('Jammu', 'Jammu & Kashmir', 'India', 'North India', 'Heritage', 9900, 4.5, 'October – March', 'The gateway to Vaishno Devi, with riverside temples, old forts and a busy winter capital.', 'Vaishno Devi', 'Raghunath Temple', 'Bahu Fort', 'Cultural'),

    D('Leh', 'Ladakh', 'India', 'North India', 'Adventure', 18900, 4.8, 'May – September', 'A high-desert town of monasteries, prayer flags and dramatic passes, and the base for every Ladakh road trip.', 'Leh Palace', 'Shanti Stupa', 'Magnetic Hill', 'Cultural'),
    D('Nubra Valley', 'Ladakh', 'India', 'North India', 'Adventure', 21900, 4.8, 'May – September', 'Cold-desert dunes, double-hump camels and Diskit monastery sit beyond the Khardung La pass.', 'Diskit Monastery', 'Hunder dunes', 'Double-hump camels'),
    D('Pangong Lake', 'Ladakh', 'India', 'North India', 'Nature', 21900, 4.8, 'May – September', 'A startling blue high-altitude lake stretching toward Tibet, reached over the Chang La pass.', 'Pangong Tso', 'Spangmik', 'Chang La'),
    D('Kargil', 'Ladakh', 'India', 'North India', 'Adventure', 19900, 4.6, 'June – September', 'A frontier town of war memorials, apricot orchards and the green Suru valley, on the road between Srinagar and Leh.', 'Kargil War Memorial', 'Suru Valley', 'Mulbekh Monastery'),

    D('Kavaratti', 'Lakshadweep', 'India', 'Islands', 'Beaches', 24900, 4.7, 'October – March', 'The Lakshadweep capital offers turquoise lagoons, coral gardens and a quiet island pace.', 'Kavaratti lagoon', 'Marine aquarium', 'Ujra Mosque', 'Romantic'),
    D('Bangaram', 'Lakshadweep', 'India', 'Islands', 'Beaches', 29900, 4.8, 'November – April', 'A tiny coral atoll with beach huts, clear water and excellent diving in the surrounding lagoon.', 'Bangaram atoll', 'Scuba diving', 'Beach huts', 'Luxury'),
    D('Minicoy', 'Lakshadweep', 'India', 'Islands', 'Beaches', 26900, 4.6, 'November – April', 'A remote southern island with a working lighthouse, wide lagoon and a distinctive Maldivian-influenced culture.', 'Minicoy lighthouse', 'Lagoon', 'Tuna fishing'),

    D('Puducherry', 'Puducherry', 'India', 'South India', 'Heritage', 8900, 4.6, 'October – March', 'A former French colony of mustard-yellow streets, seaside promenades, cafes and Sri Aurobindo ashram heritage.', 'Promenade Beach', 'French Quarter', 'Auroville', 'Romantic'),
    D('Auroville', 'Puducherry', 'India', 'South India', 'Relaxation', 8900, 4.5, 'October – March', 'An international township built around the Matrimandir, with quiet gardens, organic farms and a slower rhythm.', 'Matrimandir', 'Auroville Beach', 'Verite'),
    D('Karaikal', 'Puducherry', 'India', 'South India', 'Beaches', 7900, 4.3, 'November – February', 'A quiet coastal district of temple towns, a broad beach and easy access to the Cauvery delta.', 'Karaikal Beach', 'Nagore Dargah', 'Tarangambadi'),

    /* __INDIA_ROWS__ */
  );

  destinations.push(
    I('Bali', 'Indonesia', 'International', 'Southeast Asia', 'Beaches', 49900, 4.7, 'April – October', 'Rice terraces, temple mornings and surf beaches make Bali an easy first international escape from India.', 'Ubud rice terraces', 'Uluwatu Temple', 'Nusa Penida', 'Romantic'),
    I('Singapore', 'Singapore', 'International', 'Southeast Asia', 'City', 45900, 4.6, 'February – April', 'A compact, efficient city-state of futuristic gardens, hawker food and family-friendly attractions.', 'Marina Bay', 'Gardens by the Bay', 'Sentosa', 'Family'),
    I('Dubai', 'United Arab Emirates', 'International', 'Middle East', 'City', 42900, 4.6, 'November – March', 'Skyline views, desert dunes and old-world souks sit side by side in the Gulf’s most talked-about city.', 'Burj Khalifa', 'Desert safari', 'Dubai Creek', 'Family'),
    I('Abu Dhabi', 'United Arab Emirates', 'International', 'Middle East', 'City', 41900, 4.5, 'November – March', 'A calmer Gulf capital with a spectacular grand mosque, world-class museums and a long corniche.', 'Sheikh Zayed Grand Mosque', 'Louvre Abu Dhabi', 'Corniche', 'Family'),
    I('Maldives', 'Maldives', 'International', 'South Asia', 'Beaches', 69900, 4.9, 'November – April', 'Overwater villas, house reefs and impossibly clear lagoons define this classic Indian Ocean honeymoon escape.', 'Overwater villa', 'House-reef snorkelling', 'Sandbank picnic', 'Luxury'),
    I('Bangkok', 'Thailand', 'International', 'Southeast Asia', 'City', 32900, 4.5, 'November – February', 'Temple complexes, canal boats and an extraordinary street-food scene make Bangkok a rewarding city break.', 'Grand Palace', 'Wat Arun', 'Street food tour', 'Family'),
    I('Phuket', 'Thailand', 'International', 'Southeast Asia', 'Beaches', 36900, 4.6, 'November – April', 'Thailand’s best-known island mixes busy beaches, island-hopping day trips and a quieter old town.', 'Patong Beach', 'Phi Phi Islands', 'Phuket Old Town', 'Romantic'),
    I('Krabi', 'Thailand', 'International', 'Southeast Asia', 'Beaches', 35900, 4.7, 'November – April', 'Limestone cliffs, warm water and long-tail boats make Krabi a relaxed base for beach and island days.', 'Railay Beach', 'Ao Nang', 'Hong Islands', 'Adventure'),
    I('Hanoi', 'Vietnam', 'International', 'Southeast Asia', 'City', 34900, 4.6, 'October – April', 'A layered capital of lakeside walks, French-era streets and a food culture that rewards wandering.', 'Old Quarter', 'Hoan Kiem Lake', 'Street food walk', 'Cultural'),
    I('Ha Long Bay', 'Vietnam', 'International', 'Southeast Asia', 'Nature', 38900, 4.8, 'October – April', 'Thousands of limestone karsts rise from emerald water, best seen from an overnight cruise.', 'Overnight cruise', 'Limestone karsts', 'Sung Sot Cave', 'Romantic'),
    I('Ho Chi Minh City', 'Vietnam', 'International', 'Southeast Asia', 'City', 33900, 4.5, 'December – April', 'Vietnam’s energetic southern hub, with war history, markets and a cafe culture that runs late.', 'Cu Chi Tunnels', 'War Remnants Museum', 'Ben Thanh Market', 'Cultural'),
    I('Da Nang', 'Vietnam', 'International', 'Southeast Asia', 'Beaches', 34900, 4.6, 'February – August', 'A long beach city within easy reach of the marble mountains, Ba Na Hills and the old town of Hoi An.', 'My Khe Beach', 'Ba Na Hills', 'Hoi An day trip', 'Family'),
    I('Colombo', 'Sri Lanka', 'International', 'South Asia', 'City', 29900, 4.4, 'December – March', 'Sri Lanka’s coastal capital blends colonial buildings, temples and markets with a growing dining scene.', 'Galle Face Green', 'Gangaramaya Temple', 'Pettah Market', 'Cultural'),
    I('Kandy', 'Sri Lanka', 'International', 'South Asia', 'Heritage', 28900, 4.5, 'December – April', 'A hill-ringed cultural capital centred on the Temple of the Tooth, with tea country close by.', 'Temple of the Tooth', 'Kandy Lake', 'Peradeniya Gardens', 'Cultural'),
    I('Kathmandu', 'Nepal', 'International', 'South Asia', 'Heritage', 27900, 4.5, 'October – November and March – April', 'A valley of stupas, durbar squares and mountain views, with trekking routes beginning just beyond the city.', 'Swayambhunath', 'Kathmandu Durbar Square', 'Patan', 'Cultural'),
    I('Pokhara', 'Nepal', 'International', 'South Asia', 'Nature', 26900, 4.6, 'October – November and March – May', 'A lakeside town beneath the Annapurnas, with paragliding, quiet walks and sunrise viewpoints.', 'Phewa Lake', 'Sarangkot', 'Annapurna views', 'Adventure'),
    I('Thimphu', 'Bhutan', 'International', 'South Asia', 'Heritage', 44900, 4.6, 'March – May and September – November', 'Bhutan’s small capital balances dzongs, monasteries and a modern Bhutanese way of life.', 'Buddha Dordenma', 'Tashichho Dzong', 'Weekend market', 'Cultural'),
    I('Paro', 'Bhutan', 'International', 'South Asia', 'Mountains', 47900, 4.8, 'March – May and September – November', 'A valley of traditional farmhouses and monasteries, with the famous cliffside Tiger’s Nest trek.', 'Tiger’s Nest', 'Rinpung Dzong', 'Chele La', 'Adventure'),
    I('Tokyo', 'Japan', 'International', 'East Asia', 'City', 79900, 4.7, 'March – May and October – November', 'Neon neighbourhoods, immaculate trains and quiet shrines make Tokyo endlessly rewarding to explore.', 'Shibuya Crossing', 'Senso-ji Temple', 'Mount Fuji day trip', 'Family'),
    I('Kyoto', 'Japan', 'International', 'East Asia', 'Heritage', 74900, 4.8, 'March – May and October – November', 'Japan’s old capital is a city of temples, bamboo groves, tea houses and carefully kept gardens.', 'Fushimi Inari', 'Kinkaku-ji', 'Arashiyama', 'Cultural'),
    I('Seoul', 'South Korea', 'International', 'East Asia', 'City', 64900, 4.6, 'April – May and September – November', 'Palaces, mountain trails and a fast-moving food and design scene make Seoul a lively city break.', 'Gyeongbokgung', 'Myeongdong', 'N Seoul Tower', 'Family'),
    I('Jeju Island', 'South Korea', 'International', 'East Asia', 'Nature', 62900, 4.6, 'April – June and September – October', 'A volcanic island of craters, coastal trails and quiet beaches, with a distinctly slower pace.', 'Hallasan', 'Seongsan Ilchulbong', 'Hyeopjae Beach', 'Romantic'),
    I('Kuala Lumpur', 'Malaysia', 'International', 'Southeast Asia', 'City', 31900, 4.5, 'May – July and December – February', 'A modern, affordable capital of towers, markets and a superb mix of Malay, Chinese and Indian food.', 'Petronas Towers', 'Batu Caves', 'Bukit Bintang', 'Family'),
    I('Langkawi', 'Malaysia', 'International', 'Southeast Asia', 'Beaches', 34900, 4.6, 'November – March', 'An island of cable-car views, mangrove tours and long beaches, popular with couples and families.', 'SkyCab cable car', 'Island hopping', 'Pantai Cenang', 'Romantic'),
    I('Siem Reap', 'Cambodia', 'International', 'Southeast Asia', 'Heritage', 32900, 4.7, 'November – March', 'The gateway to Angkor Wat, with temple sunrise, floating villages and a relaxed café-lined centre.', 'Angkor Wat', 'Bayon Temple', 'Tonle Sap', 'Cultural'),
    I('Luang Prabang', 'Laos', 'International', 'Southeast Asia', 'Heritage', 33900, 4.6, 'October – April', 'A UNESCO town of golden temples, riverside cafes and the quiet morning alms ceremony.', 'Kuang Si Falls', 'Night market', 'Alms ceremony', 'Cultural'),
    I('Manila', 'Philippines', 'International', 'Southeast Asia', 'City', 38900, 4.3, 'December – May', 'A busy, historic capital with walled-city lanes, museums and easy access to island flights.', 'Intramuros', 'Rizal Park', 'Makati', 'Family'),
    I('Palawan', 'Philippines', 'International', 'Southeast Asia', 'Beaches', 52900, 4.8, 'November – May', 'El Nido’s lagoons and Coron’s wrecks make Palawan one of Southeast Asia’s great island escapes.', 'El Nido lagoons', 'Underground River', 'Coron', 'Adventure'),
    I('Hong Kong', 'Hong Kong', 'International', 'East Asia', 'City', 57900, 4.6, 'October – March', 'A harbour city of skyline views, ferries, markets and excellent dim sum, with islands a short ride away.', 'Victoria Peak', 'Star Ferry', 'Lantau Island', 'Family'),
    I('Istanbul', 'Turkey', 'International', 'Europe', 'Heritage', 59900, 4.7, 'April – June and September – November', 'A city where Europe and Asia meet, with great mosques, bazaars and a beautiful Bosphorus waterfront.', 'Hagia Sophia', 'Blue Mosque', 'Bosphorus cruise', 'Cultural'),
    I('Cappadocia', 'Turkey', 'International', 'Europe', 'Adventure', 54900, 4.8, 'April – June and September – November', 'Cave hotels, rock-cut valleys and sunrise hot-air balloon flights make Cappadocia unlike anywhere else.', 'Hot-air balloon flight', 'Goreme Open Air Museum', 'Cave hotels', 'Romantic'),
    I('Tbilisi', 'Georgia', 'International', 'Europe', 'City', 49900, 4.6, 'May – June and September – October', 'A warm, walkable capital of old balconies, sulphur baths and a food and wine culture worth planning around.', 'Old Town', 'Narikala Fortress', 'Kakheti wine region', 'Cultural'),
    I('Baku', 'Azerbaijan', 'International', 'Europe', 'City', 46900, 4.5, 'April – June and September – October', 'A Caspian capital where a walled old city sits beneath futuristic towers and wide seaside boulevards.', 'Old City', 'Flame Towers', 'Gobustan', 'Family'),
    I('Almaty', 'Kazakhstan', 'International', 'Central Asia', 'Mountains', 52900, 4.6, 'May – September', 'A green, mountain-fringed city with easy access to alpine lakes, cable cars and canyon country.', 'Big Almaty Lake', 'Medeu', 'Charyn Canyon', 'Adventure'),
    I('Tashkent', 'Uzbekistan', 'International', 'Central Asia', 'City', 44900, 4.5, 'March – May and September – October', 'A spacious, tree-lined capital of grand Soviet-era metro stations, bazaars and modern Uzbek food.', 'Hazrati Imam', 'Chorsu Bazaar', 'Tashkent Metro', 'Cultural'),
    I('Samarkand', 'Uzbekistan', 'International', 'Central Asia', 'Heritage', 47900, 4.8, 'March – May and September – October', 'The Registan and a skyline of turquoise domes make Samarkand one of the Silk Road’s great cities.', 'Registan', 'Gur-e-Amir', 'Shah-i-Zinda', 'Cultural'),
    I('Cairo', 'Egypt', 'International', 'Africa', 'Heritage', 59900, 4.6, 'October – April', 'The pyramids, a vast antiquities museum and a lively Nile waterfront make Cairo an unforgettable history trip.', 'Pyramids of Giza', 'Egyptian Museum', 'Nile cruise', 'Cultural'),
    I('Mauritius', 'Mauritius', 'International', 'Africa', 'Beaches', 74900, 4.7, 'May – December', 'Lagoon beaches, sugar-cane hills and a mix of Indian, African and French influences suit a slow island holiday.', 'Le Morne', 'Chamarel', 'Lagoon cruise', 'Romantic'),
    I('Seychelles', 'Seychelles', 'International', 'Africa', 'Beaches', 89900, 4.8, 'April – May and October – November', 'Granite boulders, palm-lined coves and clear water make this Indian Ocean archipelago a premium escape.', 'Mahe', 'Praslin', 'La Digue', 'Luxury'),
    I('Paris', 'France', 'International', 'Europe', 'City', 89900, 4.7, 'April – June and September – October', 'Museums, boulevards and riverside walks give Paris its enduring appeal, with easy rail links onward.', 'Eiffel Tower', 'Louvre Museum', 'Seine cruise', 'Romantic'),
    I('Interlaken', 'Switzerland', 'International', 'Europe', 'Mountains', 99900, 4.8, 'May – September', 'A lakeside base between two alpine lakes, with mountain railways, cable cars and postcard villages.', 'Jungfraujoch', 'Lake Brienz', 'Lauterbrunnen', 'Family'),
    I('London', 'United Kingdom', 'International', 'Europe', 'City', 94900, 4.6, 'May – September', 'Royal history, world-class museums and diverse neighbourhoods make London an easy, rewarding city break.', 'Tower of London', 'British Museum', 'Thames cruise', 'Family'),
    I('New York', 'United States', 'International', 'North America', 'City', 109900, 4.6, 'April – June and September – November', 'The classic big-city break, with skyline views, Broadway shows, museums and neighbourhoods to wander.', 'Times Square', 'Central Park', 'Statue of Liberty', 'Family'),

    /* __INTERNATIONAL_ROWS__ */
  );

  function P(name, destinationId, price, duration, rating, summary, highlights, accommodation, meals, transport, tags) {
    const destination = destinations.find(function (item) { return item.id === destinationId; }) || destinations[0];
    const dayMatch = /(\d+)\s*Days/i.exec(duration);
    const days = dayMatch ? parseInt(dayMatch[1], 10) : 4;
    const spots = (highlights && highlights.length ? highlights : destination.highlights).slice();
    const itinerary = [];

    itinerary.push({
      day: 1,
      title: 'Arrival in ' + destination.name,
      description: 'Arrive and transfer to your stay, with time to settle in and take an easy first walk around ' + destination.name + '. Your trip coordinator shares the plan for the days ahead over dinner.'
    });

    for (let day = 2; day < days; day += 1) {
      const spot = spots[(day - 2) % spots.length];
      itinerary.push({
        day: day,
        title: 'Explore ' + spot,
        description: 'A relaxed day built around ' + spot + ', with time for local food and an unhurried evening back at the hotel.'
      });
    }

    if (days > 1) {
      itinerary.push({
        day: days,
        title: 'Departure',
        description: 'Breakfast at the hotel, a final check-out and a comfortable transfer for your onward journey.'
      });
    }

    const destCountry = destination.country || (destination.destinationType === 'international' ? 'International' : 'India');
    const destType = destination.destinationType || (destCountry === 'India' ? 'domestic' : 'international');

    return {
      id: slug(name),
      name: name,
      destinationId: destination.id,
      destinationName: destination.name,
      destinationCountry: destCountry,
      destinationType: destType,
      state: destination.state,
      country: destCountry,
      region: destination.region,
      type: destination.type,
      image: DEST_IMAGES[destination.id] || destination.image || IMAGE.fallback,
      duration: duration,
      startingPrice: price,
      rating: rating,
      bestTime: destination.bestTime,
      summary: summary,
      longDescription: summary + ' The itinerary is paced with free time and can be adjusted for families, couples or solo travellers before departure.',
      highlights: spots,
      accommodation: accommodation,
      meals: meals,
      transport: transport,
      itinerary: itinerary,
      tags: [(destType === 'international' || destCountry !== 'India') ? 'International' : 'India'].concat(tags || []),
      badgeClass: destination.badgeClass
    };
  }

  const packages = [];

  packages.push(
    P('The Himalayan Escape', 'manali', 18900, '6 Days / 5 Nights', 4.9, 'A classic Himachal journey through pine valleys, riverside towns and the adventure playground of Solang Valley.', ['Solang Valley', 'Hadimba Temple', 'Old Manali', 'Naggar Castle'], 'Five nights in a valley-facing boutique hotel', 'Daily breakfast and three dinners', 'Private AC SUV with airport and station transfers', ['Mountains', 'Adventure']),
    P('A Royal Rajasthan Trail', 'jaipur', 16400, '5 Days / 4 Nights', 4.8, 'Forts, palaces and lake sunsets on a carefully paced introduction to Rajasthan’s royal cities.', ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Lake Pichola'], 'Heritage haveli and boutique palace stays', 'Daily breakfast and two traditional dinners', 'Private sedan with chauffeur throughout', ['Heritage', 'Culture']),
    P('Kerala, at Your Own Pace', 'alleppey', 22500, '7 Days / 6 Nights', 4.9, 'Tea hills, backwater canals and a night on a traditional houseboat, with plenty of time to slow down.', ['Munnar tea estates', 'Vembanad Lake', 'Alappuzha Beach', 'Fort Kochi'], 'Plantation stay, boutique hotel and one houseboat night', 'Daily breakfast and all houseboat meals', 'Private car with driver and backwater cruise', ['Relaxation', 'Nature']),
    P('Goa Beach Escape', 'north-goa', 14900, '4 Days / 3 Nights', 4.7, 'A short, easy coastal break balancing north Goa’s lively beaches with a quiet day in the Latin quarter.', ['Baga and Calangute', 'Fort Aguada', 'Fontainhas', 'Anjuna market'], 'Three nights at a beachside boutique hotel', 'Daily breakfast', 'Airport transfers and local sightseeing car', ['Beaches', 'Family']),
    P('Ladakh High Passes', 'leh', 32900, '7 Days / 6 Nights', 4.9, 'A high-altitude road trip across Ladakh’s passes, monasteries and the improbable blue of Pangong Lake.', ['Leh Palace', 'Nubra Valley', 'Pangong Lake', 'Khardung La'], 'Six nights across Leh, Nubra and Pangong', 'Daily breakfast and dinner', 'Private 4x4 with experienced mountain driver', ['Adventure', 'Mountains']),
    P('Kashmir Valley Sojourn', 'srinagar', 24900, '6 Days / 5 Nights', 4.8, 'Houseboats, Mughal gardens and meadow drives through the best of the Kashmir valley.', ['Dal Lake', 'Gulmarg', 'Pahalgam', 'Mughal gardens'], 'Houseboat night plus valley hotels', 'Daily breakfast and dinner', 'Private car with airport transfers', ['Romantic', 'Mountains']),
    P('Varanasi & Ayodhya Darshan', 'varanasi', 13900, '4 Days / 3 Nights', 4.7, 'A thoughtful pilgrimage combining the ghats of Varanasi with the rebuilt Ram Mandir in Ayodhya.', ['Ganga aarti', 'Kashi Vishwanath', 'Ram Mandir', 'Sarnath'], 'Three nights in a riverside heritage hotel', 'Daily breakfast', 'Private car and local guide', ['Spiritual', 'Culture']),
    P('Golden Triangle Classic', 'agra', 15900, '5 Days / 4 Nights', 4.8, 'Delhi, Agra and Jaipur in one well-paced circuit, with the Taj Mahal at sunrise.', ['Taj Mahal', 'Agra Fort', 'Amber Fort', 'India Gate'], 'Four nights in handpicked 3-star hotels', 'Daily breakfast', 'Private AC car and monument transfers', ['Heritage', 'Family']),
    P('Meghalaya Cloud Country', 'shillong', 18900, '6 Days / 5 Nights', 4.7, 'Waterfalls, living root bridges and the clear Umngot river on a green northeast escape.', ['Umiam Lake', 'Nohkalikai Falls', 'Dawki', 'Mawlynnong'], 'Boutique guesthouses and a riverside camp', 'Daily breakfast and two dinners', 'Private car with driver-guide', ['Nature', 'Adventure']),
    P('Sikkim Monastery Trail', 'gangtok', 19900, '6 Days / 5 Nights', 4.7, 'A mountain journey through Sikkim’s monasteries, high lakes and Kanchenjunga viewpoints.', ['Rumtek Monastery', 'Tsomgo Lake', 'Pelling', 'Yumthang Valley'], 'Five nights across Gangtok, Pelling and Lachung', 'Daily breakfast and dinner', 'Private 4x4 with mountain driver', ['Mountains', 'Culture']),
    P('Andaman Island Escape', 'port-blair', 27900, '6 Days / 5 Nights', 4.8, 'Coral reefs, quiet beaches and a moving history lesson across the Andaman islands.', ['Cellular Jail', 'Radhanagar Beach', 'Elephant Beach', 'Ross Island'], 'Beach resorts on Port Blair and Havelock', 'Daily breakfast', 'Ferry tickets and island transfers', ['Beaches', 'Romantic']),
    P('Ranthambore Tiger Weekend', 'ranthambore', 16900, '3 Days / 2 Nights', 4.8, 'Two nights in tiger country with morning and evening safaris in Ranthambore’s dry forest.', ['Tiger safari', 'Ranthambore Fort', 'Padam Talao'], 'Two nights at a forest-edge lodge', 'All meals at the lodge', 'Safari jeep and station transfers', ['Wildlife', 'Family']),
    P('Hampi Heritage Walk', 'hampi', 11900, '4 Days / 3 Nights', 4.7, 'A slow exploration of Vijayanagara ruins, boulder hills and riverside temples.', ['Virupaksha Temple', 'Vittala Temple', 'Matanga Hill'], 'Three nights in a boutique heritage stay', 'Daily breakfast', 'Private car and local guide', ['Heritage', 'Culture']),
    P('Coorg Coffee Trails', 'coorg', 14900, '4 Days / 3 Nights', 4.7, 'Misty plantations, spice gardens and waterfall walks in Karnataka’s coffee country.', ['Abbey Falls', 'Raja’s Seat', 'Coffee estate walk', 'Dubare'], 'Three nights at a working coffee estate', 'Daily breakfast and two estate dinners', 'Private car with driver', ['Nature', 'Romantic']),
    P('Uttarakhand Foothills', 'rishikesh', 13900, '4 Days / 3 Nights', 4.6, 'Riverside yoga, a Ganges aarti and an optional rafting stretch in the Himalayan foothills.', ['Laxman Jhula', 'Triveni Ghat', 'River rafting', 'Haridwar'], 'Three nights at a riverside retreat', 'Daily breakfast', 'Private car and airport transfers', ['Adventure', 'Spiritual']),
    P('Darjeeling Tea Trails', 'darjeeling', 15900, '5 Days / 4 Nights', 4.7, 'Sunrise over Kanchenjunga, toy-train curves and tea estate walks in the eastern Himalayas.', ['Tiger Hill', 'Batasia Loop', 'Happy Valley Tea Estate', 'Kalimpong'], 'Four nights across Darjeeling and Kalimpong', 'Daily breakfast', 'Private car with driver-guide', ['Mountains', 'Family']),
    P('Odisha Temples & Coast', 'puri', 12900, '5 Days / 4 Nights', 4.6, 'Ancient temples, the Konark sun chariot and quiet Odisha beaches in one compact circuit.', ['Jagannath Temple', 'Sun Temple', 'Chilika Lake', 'Puri Beach'], 'Four nights in a coastal heritage hotel', 'Daily breakfast', 'Private car with driver', ['Heritage', 'Spiritual']),
    P('Gujarat Rann & Lions', 'kutch', 18900, '5 Days / 4 Nights', 4.7, 'The white salt desert, craft villages and a lion safari in Gujarat’s wild west.', ['White Rann', 'Bhuj heritage sites', 'Artisan villages', 'Gir safari'], 'Three nights in Kutch and one near Gir', 'Daily breakfast and two dinners', 'Private car with driver-guide', ['Heritage', 'Wildlife']),
    P('Northeast Explorer', 'kaziranga', 22900, '7 Days / 6 Nights', 4.7, 'Rhinos, tea estates and river islands on a week-long introduction to Assam and its neighbours.', ['Kaziranga safari', 'Majuli', 'Guwahati', 'Tea estate'], 'Six nights across Guwahati, Kaziranga and Majuli', 'Daily breakfast and dinner', 'Private car, ferry and safari jeep', ['Wildlife', 'Nature']),
    P('Mumbai & Lonavala Break', 'mumbai', 11900, '4 Days / 3 Nights', 4.5, 'A city-and-hills combination pairing Mumbai’s energy with a quiet Sahyadri escape.', ['Gateway of India', 'Marine Drive', 'Bhushi Dam', 'Karla Caves'], 'Three nights across Mumbai and Lonavala', 'Daily breakfast', 'Private car with airport transfers', ['City', 'Family']),
    P('Bali Island Escape', 'bali', 49900, '6 Days / 5 Nights', 4.7, 'Rice terraces, temple sunsets and beach time on Bali’s most-loved corners.', ['Ubud rice terraces', 'Uluwatu Temple', 'Nusa Penida', 'Seminyak'], 'Five nights across Ubud and Seminyak', 'Daily breakfast', 'Private transfers and island day boat', ['Beaches', 'Romantic']),
    P('Singapore City Break', 'singapore', 45900, '5 Days / 4 Nights', 4.6, 'Gardens, hawker centres and Sentosa in a compact, family-friendly city break.', ['Marina Bay', 'Gardens by the Bay', 'Sentosa', 'Little India'], 'Four nights in a central 4-star hotel', 'Daily breakfast', 'Airport transfers and MRT card', ['City', 'Family']),
    P('Dubai Desert & City', 'dubai', 42900, '5 Days / 4 Nights', 4.6, 'Skyline views, an evening desert safari and old Dubai’s creekside markets.', ['Burj Khalifa', 'Desert safari', 'Dubai Creek', 'Dubai Marina'], 'Four nights in a downtown 4-star hotel', 'Daily breakfast', 'Airport transfers and safari pickup', ['City', 'Family']),
    P('Maldives Overwater Retreat', 'maldives', 69900, '5 Days / 4 Nights', 4.9, 'An overwater villa, a house reef and very little on the agenda beyond the lagoon.', ['Overwater villa', 'House-reef snorkelling', 'Sandbank picnic', 'Sunset cruise'], 'Four nights in an overwater villa', 'All meals on a half-board plan', 'Speedboat transfers from Male', ['Beaches', 'Luxury']),
    P('Thailand Beaches & Islands', 'phuket', 36900, '6 Days / 5 Nights', 4.6, 'Phuket’s beaches and Phi Phi’s limestone islands, with time left over for Thai food and massages.', ['Patong Beach', 'Phi Phi Islands', 'Phuket Old Town', 'Karon Viewpoint'], 'Five nights at a beach hotel', 'Daily breakfast', 'Airport transfers and island ferry', ['Beaches', 'Romantic']),
    P('Vietnam Highlights', 'hanoi', 38900, '7 Days / 6 Nights', 4.7, 'Hanoi’s old quarter, an overnight Ha Long cruise and the beaches of Da Nang.', ['Old Quarter', 'Ha Long Bay cruise', 'Hoi An', 'My Khe Beach'], 'Six nights across Hanoi, Ha Long and Da Nang', 'Daily breakfast and cruise meals', 'Internal flight, transfers and cruise', ['Heritage', 'Nature']),
    P('Sri Lanka Round Trip', 'colombo', 34900, '7 Days / 6 Nights', 4.6, 'Colombo, Kandy’s temple and the tea country hills on a compact island circuit.', ['Galle Face', 'Temple of the Tooth', 'Peradeniya Gardens', 'Nuwara Eliya'], 'Six nights in handpicked hotels', 'Daily breakfast', 'Private car with driver-guide', ['Heritage', 'Nature']),
    P('Nepal Himalaya Discovery', 'kathmandu', 29900, '5 Days / 4 Nights', 4.7, 'Stupas, durbar squares and a sunrise over the Annapurnas from Pokhara.', ['Swayambhunath', 'Kathmandu Durbar Square', 'Phewa Lake', 'Sarangkot'], 'Four nights across Kathmandu and Pokhara', 'Daily breakfast', 'Private car and domestic flight', ['Heritage', 'Mountains']),
    P('Bhutan Cultural Journey', 'paro', 54900, '6 Days / 5 Nights', 4.8, 'Dzongs, mountain passes and the Tiger’s Nest trek on a measured Bhutanese journey.', ['Tiger’s Nest', 'Rinpung Dzong', 'Thimphu', 'Chele La'], 'Five nights in Bhutanese heritage hotels', 'All meals', 'Private car with licensed guide', ['Heritage', 'Adventure']),
    P('Japan Cherry Trail', 'tokyo', 89900, '7 Days / 6 Nights', 4.8, 'Tokyo’s neighbourhoods and Kyoto’s temples, with a Mount Fuji day in between.', ['Shibuya Crossing', 'Senso-ji Temple', 'Mount Fuji', 'Fushimi Inari'], 'Six nights in well-located city hotels', 'Daily breakfast', 'Airport transfers and rail passes', ['City', 'Cultural']),
    P('Cambodia Temple Trail', 'siem-reap', 34900, '5 Days / 4 Nights', 4.7, 'Sunrise at Angkor Wat, jungle temples and a floating village on Tonle Sap.', ['Angkor Wat', 'Bayon Temple', 'Ta Prohm', 'Tonle Sap'], 'Four nights in a boutique Siem Reap hotel', 'Daily breakfast', 'Temple transfers with local guide', ['Heritage', 'Culture']),
    P('Europe Grand Tour', 'paris', 149900, '10 Days / 9 Nights', 4.7, 'Paris, the Swiss Alps and London in one carefully connected European rail journey.', ['Eiffel Tower', 'Jungfraujoch', 'Lauterbrunnen', 'Tower of London'], 'Nine nights in central 3 and 4-star hotels', 'Daily breakfast', 'Rail passes and airport transfers', ['City', 'Mountains']),

    /* __PACKAGE_ROWS__ */
  );

  global.RoamData = {
    destinations: destinations,
    packages: packages,
    image: IMAGE,
    typeImage: TYPE_IMAGE,
    typeBadge: TYPE_BADGE,
    slug: slug
  };
})(window);
