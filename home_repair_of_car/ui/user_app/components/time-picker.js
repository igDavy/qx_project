class TimePickerModal {
    constructor() {
        // 创建并插入HTML结构
        this.createModalStructure();
        
        this.modal = document.getElementById('timePickerModal');
        this.closeBtn = this.modal.querySelector('.close-btn');
        this.confirmBtn = this.modal.querySelector('.confirm-btn');
        this.dateItems = this.modal.querySelectorAll('.date-item');
        this.timeSlots = this.modal.querySelectorAll('.time-slot');
        
        this.selectedDate = null;
        this.selectedTime = null;
        
        this.initializeEvents();
    }
    
    createModalStructure() {
        const modalHTML = `
            <div class="time-picker-modal" id="timePickerModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close-btn">&times;</span>
                        <h3>选择预约时间</h3>
                    </div>
                    <div class="modal-body">
                        <div class="notice-text">
                            师傅预约前会与您确认最终预约时间
                        </div>
                        <div class="date-list">
                            <div class="date-item active" data-date="03月21日">
                                <span class="day">今天</span>
                                <span class="date">03月21日</span>
                            </div>
                            <div class="date-item" data-date="03月22日">
                                <span class="day">周六</span>
                                <span class="date">03月22日</span>
                            </div>
                            <div class="date-item" data-date="03月23日">
                                <span class="day">周日</span>
                                <span class="date">03月23日</span>
                            </div>
                            <div class="date-item" data-date="03月24日">
                                <span class="day">周一</span>
                                <span class="date">03月24日</span>
                            </div>
                            <div class="date-item" data-date="03月25日">
                                <span class="day">周二</span>
                                <span class="date">03月25日</span>
                            </div>
                        </div>
                        <div class="time-slots">
                            <div class="time-slot" data-time="09:00-11:00">09:00-11:00</div>
                            <div class="time-slot" data-time="11:00-13:00">11:00-13:00</div>
                            <div class="time-slot" data-time="13:00-15:00">13:00-15:00</div>
                            <div class="time-slot" data-time="15:00-17:00">15:00-17:00</div>
                            <div class="time-slot" data-time="17:00-19:00">17:00-19:00</div>
                            <div class="time-slot" data-time="19:00-21:00">19:00-21:00</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="confirm-btn" disabled>确定</button>
                    </div>
                </div>
            </div>
            <style>
            .time-picker-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1000;
            }
            
            .modal-content {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background-color: white;
                border-radius: 12px 12px 0 0;
                padding: 16px;
                box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }
            
            .close-btn {
                font-size: 24px;
                color: #666;
                cursor: pointer;
            }
            
            .notice-text {
                color: #666;
                font-size: 14px;
                margin-bottom: 15px;
                text-align: center;
            }
            
            .date-list {
                display: flex;
                gap: 12px;
                margin-bottom: 16px;
                overflow-x: auto;
                padding: 4px 0;
                -webkit-overflow-scrolling: touch;
            }
            
            .date-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 8px 16px;
                border-radius: 6px;
                border: 1px solid #eee;
                cursor: pointer;
                min-width: 70px;
            }
            
            .date-item.active {
                background-color: #007AFF;
                color: white;
                border-color: #007AFF;
            }
            
            .day {
                font-size: 14px;
                margin-bottom: 5px;
            }
            
            .date {
                font-size: 12px;
            }
            
            .time-slots {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
                margin-bottom: 16px;
                padding: 0 4px;
            }
            
            .time-slot {
                padding: 10px;
                text-align: center;
                border: 1px solid #eee;
                border-radius: 6px;
                cursor: pointer;
                font-size: 13px;
                color: #333;
            }
            
            .time-slot.active {
                background-color: #007AFF;
                color: white;
                border-color: #007AFF;
            }
            
            .confirm-btn {
                width: 100%;
                padding: 12px;
                background-color: #007AFF;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 15px;
                cursor: pointer;
                font-weight: 500;
            }
            
            .confirm-btn:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }
            </style>
        `;
        
        // 将HTML结构插入到容器中
        const container = document.getElementById('timePickerContainer');
        if (container) {
            container.innerHTML = modalHTML;
        }
    }
    
    initializeEvents() {
        // 关闭按钮事件
        this.closeBtn.addEventListener('click', () => this.hide());
        
        // 日期选择事件
        this.dateItems.forEach(item => {
            item.addEventListener('click', () => {
                this.dateItems.forEach(d => d.classList.remove('active'));
                item.classList.add('active');
                this.selectedDate = item.dataset.date;
                this.updateConfirmButton();
            });
        });
        
        // 时间段选择事件
        this.timeSlots.forEach(slot => {
            slot.addEventListener('click', () => {
                this.timeSlots.forEach(t => t.classList.remove('active'));
                slot.classList.add('active');
                this.selectedTime = slot.dataset.time;
                this.updateConfirmButton();
            });
        });
        
        // 确认按钮事件
        this.confirmBtn.addEventListener('click', () => {
            if (this.selectedDate && this.selectedTime) {
                const selectedDateTime = {
                    date: this.selectedDate,
                    time: this.selectedTime
                };
                // 触发自定义事件
                const event = new CustomEvent('timeSelected', {
                    detail: selectedDateTime,
                    bubbles: true
                });
                this.modal.dispatchEvent(event);
                this.hide();
                // 跳转到支付页面
                const shopId = new URLSearchParams(window.location.search).get('id');
                window.location.href = `payment.html?shopId=${shopId}&date=${encodeURIComponent(this.selectedDate)}&time=${encodeURIComponent(this.selectedTime)}`;
            }
        });
    }
    
    updateConfirmButton() {
        this.confirmBtn.disabled = !(this.selectedDate && this.selectedTime);
    }
    
    show() {
        this.modal.style.display = 'block';
    }
    
    hide() {
        this.modal.style.display = 'none';
    }
}

// 导出时间选择器类
// export default TimePickerModal;