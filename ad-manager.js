// ad-manager.js

(function() {
    // --- الإعدادات ---
    // قائمة بجميع أكواد الإعلانات الجديدة الخاصة بك
    const adScripts = [
        // الإعلان الأول: رابط مباشر
        { src: 'https://pl29577604.effectivecpmnetwork.com/90/98/5b/90985b3856f0aba6bd11efc2dd9e6894.js' },
        
        // الإعلان الثاني: بنر 320x50
        { 
            src: 'https://www.highperformanceformat.com/10c5b600c97b594e544f498f9b4770d0/invoke.js',
            options: {
                'key' : '10c5b600c97b594e544f498f9b4770d0',
                'format' : 'iframe',
                'height' : 50,
                'width' : 320,
                'params' : {}
            }
        },
        
        // الإعلان الثالث: بنر 728x90
        { 
            src: 'https://www.highperformanceformat.com/3a9367b472acfa4346fee8ab24a28d73/invoke.js',
            options: {
                'key' : '3a9367b472acfa4346fee8ab24a28d73',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
            }
        }
    ];

    // التأخير الأولي قبل بدء أول دورة إعلانية (15 ثانية بناءً على إعدادك الرقمي)
    const initialDelay = 15000;

    // الفاصل الزمني بين تحميل كل إعلان داخل الدورة (25 ثانية)
    const delayBetweenAds = 25000;

    // الفاصل الزمني بعد انتهاء الدورة وقبل بدء دورة جديدة (50 ثانية)
    const delayBetweenCycles = 50000;

    // --- لا تقم بتعديل أي شيء تحت هذا السطر ---

    // دالة لإنشاء وتحميل سكريبت إعلاني واحد
    function createAndLoadScript(adInfo) {
        // إذا كان الإعلان يتطلب إعدادات atOptions، نقوم بتحديث المتغير العام قبل تحميل السكريبت
        if (adInfo.options) {
            window.atOptions = adInfo.options;
        }

        const script = document.createElement('script');
        script.src = adInfo.src;
        script.async = true;
        script.setAttribute('data-cfasync', 'false');

        // إضافة أي سمات 'data-' أخرى إن وجدت
        for (const key in adInfo) {
            if (key.startsWith('data-')) {
                script.dataset[key.replace('data-', '')] = adInfo[key];
            }
        }
        
        document.body.appendChild(script);
        console.log(`Ad script loaded: ${adInfo.src}`);
    }

    // دالة لتحميل السكريبتات بشكل متسلسل
    function loadScriptsSequentially(index = 0) {
        // إذا انتهت دورة الإعلانات
        if (index >= adScripts.length) {
            console.log(`Ad cycle complete. Scheduling next cycle in ${delayBetweenCycles / 1000} seconds.`);
            // جدولة الدورة التالية
            setTimeout(runAdCycle, delayBetweenCycles);
            return;
        }

        // تحميل الإعلان الحالي
        const adToLoad = adScripts[index];
        createAndLoadScript(adToLoad);

        // جدولة الإعلان التالي في السلسلة
        console.log(`Scheduling next ad in ${delayBetweenAds / 1000} seconds.`);
        setTimeout(() => loadScriptsSequentially(index + 1), delayBetweenAds);
    }
    
    // الدالة الرئيسية التي تبدأ دورة إعلانية
    function runAdCycle() {
        console.log("Starting new ad loading cycle.");
        loadScriptsSequentially(0);
    }

    // انتظر حتى يتم تحميل الصفحة بالكامل
    window.addEventListener('load', function() {
        console.log(`Page loaded. Waiting ${initialDelay / 1000} seconds before starting the first ad cycle.`);
        setTimeout(runAdCycle, initialDelay);
    });

})();
