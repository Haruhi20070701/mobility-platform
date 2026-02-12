// ========================================
// DOMContentLoaded: ページ読み込み完了時の初期化
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initHamburgerMenu();
    initSmoothScroll();
    initScrollAnimations();
    initFAQ();
    initContactForm();
    initBackToTop();
});

// ========================================
// ヘッダーのスクロール処理
// ========================================

function initHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========================================
// ハンバーガーメニューの開閉
// ========================================

function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // ハンバーガーボタンクリック
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        
        // body のスクロールを制御（モバイルメニュー展開時）
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // ナビゲーションリンククリック時にメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// スムーススクロール
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // # のみの場合はページトップへ
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            // 該当する要素が存在する場合
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // ヘッダーの高さを考慮したオフセット
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// スクロールアニメーション（フェードイン）
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // fade-in-up クラスを持つ全ての要素を監視
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// FAQアコーディオン
// ========================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 既に開いている場合は閉じる
            const isActive = item.classList.contains('active');
            
            // 全てのFAQを閉じる
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // クリックされた項目が閉じていた場合は開く
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// お問い合わせフォームのバリデーション
// ========================================

function initContactForm() {   
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const privacyCheckbox = document.getElementById('privacy');
    
    // エラーメッセージ要素
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const privacyError = document.getElementById('privacyError');
    
    // リアルタイムバリデーション
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    messageInput.addEventListener('blur', () => validateMessage());
    privacyCheckbox.addEventListener('change', () => validatePrivacy());
    
    // フォーム送信時の処理
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 全てのバリデーションを実行
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        const isPrivacyValid = validatePrivacy();
        
        // 全て有効な場合
        if (isNameValid && isEmailValid && isMessageValid && isPrivacyValid) {
            // 実際の送信処理はここに実装
            // 現在はデモのため、成功メッセージを表示
            showSuccessMessage();
            form.reset();
        } else {
            // エラーがある場合、最初のエラー箇所にスクロール
            const firstError = form.querySelector('.form-error:not(:empty)');
            if (firstError) {
                firstError.previousElementSibling.focus();
            }
        }
    });
    
    // バリデーション関数
    function validateName() {
        const value = nameInput.value.trim();
        
        if (value === '') {
            nameError.textContent = 'お名前を入力してください';
            nameInput.classList.add('error');
            return false;
        } else if (value.length < 2) {
            nameError.textContent = 'お名前は2文字以上で入力してください';
            nameInput.classList.add('error');
            return false;
        } else {
            nameError.textContent = '';
            nameInput.classList.remove('error');
            return true;
        }
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            emailError.textContent = 'メールアドレスを入力してください';
            emailInput.classList.add('error');
            return false;
        } else if (!emailPattern.test(value)) {
            emailError.textContent = '正しいメールアドレスを入力してください';
            emailInput.classList.add('error');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
            return true;
        }
    }
    
    function validateMessage() {
        const value = messageInput.value.trim();
        
        if (value === '') {
            messageError.textContent = 'お問い合わせ内容を入力してください';
            messageInput.classList.add('error');
            return false;
        } else if (value.length < 10) {
            messageError.textContent = 'お問い合わせ内容は10文字以上で入力してください';
            messageInput.classList.add('error');
            return false;
        } else {
            messageError.textContent = '';
            messageInput.classList.remove('error');
            return true;
        }
    }
    
    function validatePrivacy() {
        if (!privacyCheckbox.checked) {
            privacyError.textContent = 'プライバシーポリシーに同意してください';
            return false;
        } else {
            privacyError.textContent = '';
            return true;
        }
    }
    
    // 成功メッセージを表示
    function showSuccessMessage() {
        // 既存のメッセージを削除
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // 成功メッセージを作成
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #0A2E5C 0%, #1a4d8f 100%);
            color: white;
            padding: 2rem 3rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(10, 46, 92, 0.3);
            z-index: 10000;
            text-align: center;
            animation: fadeIn 0.3s ease;
        `;
        
        successMessage.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">送信完了</h3>
            <p style="opacity: 0.9;">お問い合わせありがとうございます。<br>2営業日以内にご返信いたします。</p>
        `;
        
        document.body.appendChild(successMessage);
        
        // オーバーレイを作成
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // 3秒後に自動的に閉じる
        setTimeout(() => {
            successMessage.style.animation = 'fadeOut 0.3s ease';
            overlay.style.animation = 'fadeOut 0.3s ease';
            
            setTimeout(() => {
                successMessage.remove();
                overlay.remove();
            }, 300);
        }, 3000);
        
        // クリックで閉じる
        overlay.addEventListener('click', () => {
            successMessage.remove();
            overlay.remove();
        });
    }
}

// ========================================
// トップへ戻るボタン
// ========================================

function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    // スクロール位置に応じて表示/非表示
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // クリック時の処理
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// ユーティリティ関数: デバウンス
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// パフォーマンス最適化: スクロールイベントのデバウンス
// ========================================

window.addEventListener('scroll', debounce(() => {
    // 必要に応じて追加のスクロール処理をここに記述
}, 100));

// ========================================
// アニメーション用CSSの追加（動的に挿入）
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .form-input.error,
    .form-select.error,
    .form-textarea.error {
        border-color: #DC3545;
    }
`;
document.head.appendChild(style);
