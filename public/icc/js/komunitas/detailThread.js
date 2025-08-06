const threadHeader = {
    view: "template",
    id: "threadHeader",
    autoheight: true,
    template: "Loading...",
    css: {
      padding: "24px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
  };
  
  const threadCommentForm = {
    view: "form",
    id: "commentForm",
    css: "comment",
    padding: { left: 20, right: 20, top: 8, bottom: 8 },
    elements: [
      {
        cols: [
          {
            view: "textarea",
            name: "content",
            placeholder: "Tulis komentar...",
            height: 50,
            required: true,
          },
          { width: 16 },
          {
            view: "button",
            value: "Kirim",
            css: "btn-primary",
            align: "center",
            width: 100,
            height: 50,
            click: submitComment,
          },
        ],
      },
    ],
    rules: {
      content: webix.rules.isNotEmpty,
    },
  };
  
  const threadCommentList = {
    view: "list",
    id: "threadCommentList",
    height: 400,
    scroll: "y",
    css: "comment-list",
    template: function (obj) {
      if (obj.__footerPadding) {
        return `<div style="height: 60px;"></div>`;
      }
  
      const loggedInUserId = userId; 
      const showDeleteIcon = String(obj.user?.id) === String(loggedInUserId);
      
      return `
        <div style="padding: 12px 16px; border-radius: 10px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin: 10px 12px; position: relative;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #ddd; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 16px;">👤</span>
            </div>
            <div>
              <div style="font-weight: 600; font-size: 14px;">${obj.user?.userDetail?.fullname || "Anonim"}</div>
              <div style="font-size: 12px; color: #888;">${obj.created_at}</div>
            </div>
            ${showDeleteIcon ? `
              <div style="cursor: pointer; color: #f44336; font-size: 18px; position: absolute; top: 10px; right: 10px;" onclick="deleteComment(${obj.id})">
                🗑
              </div>` : ''}
          </div>
          <div style="margin-top: 10px; font-size: 14px; color: #444; padding-left: 48px;">
            ${obj.content}
          </div>
        </div>
      `;
    },
    type: { height: "auto" },
  
    on: {
      onAfterLoad: function () {
        const list = this;
        setTimeout(() => {
          if (!list.exists("footer-padding")) {
            list.add({ id: "footer-padding", __footerPadding: true });
          }
        }, 0);
      }
    }
  };
  
  
  
  function loadThreadDetail(threadId) {
    axios
      .get(`http://localhost:3000/api/icc/thread/detail/${threadId}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const thread = res.data.data;
  
        const hasThumbnail = thread.thumbnailBase64 ? `
          <div style="max-height:300px; overflow:hidden; text-align:center; margin-bottom:10px;">
            <img src="${thread.thumbnailBase64}" style="max-height:300px; max-width:100%; object-fit:contain;" />
          </div>
        ` : "";
  
        $$("threadHeader").setHTML(`
          <h4 style="font-size: 24px; font-weight: bold; color: #be1e2d;">${thread.title}</h4>
          <div style="font-size: 13px; color: #888; margin-bottom: 16px;">oleh ${thread.user?.userDetail?.fullname || "Anonim"} • ${new Date(thread.created_at).toLocaleDateString()}</div>
          ${hasThumbnail}
          <div style="font-size: 15px; color: #333; line-height: 1.6;">${thread.content}</div>
        `);
  
        const commentList = thread.comments.map((c) => ({
          ...c,
          created_at: new Date(c.created_at).toLocaleString(),
        }));
  
        $$("threadCommentList").clearAll();
        $$("threadCommentList").parse(commentList);
  
        $$("commentForm").config.threadId = thread.id;
      })
      .catch((err) => {
        console.error("Gagal load detail:", err);
        webix.message({ type: "error", text: "Gagal memuat detail thread." });
      });
  }
  
  function submitComment() {
    const form = $$("commentForm");
    if (!form.validate()) return;
  
    const comment = form.getValues();
    comment.threadId = form.config.threadId;
    comment.userId = userId;
  
    axios
      .post(`http://localhost:3000/api/icc/comment/tambah`, comment, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        webix.message({ type: "success", text: "Komentar berhasil ditambahkan!" });
        form.clear();
        loadThreadDetail(comment.threadId);
      })
      .catch(() => {
        webix.message({ type: "error", text: "Gagal mengirim komentar." });
      });
  }

  function deleteComment(commentId) {
    webix.confirm({
      title: "Konfirmasi Delete",
      text: "Apakah anda yakin untuk menghapus komentar ini??",
      callback: function (result) {
        if (result) {
          axios.delete(`http://localhost:3000/api/icc/comment/delete/${commentId}`, {
            data: { userId: userId },
            headers: {
              Authorization: "Bearer " + token,
            },
          })
            .then(() => {
              webix.message({ type: "success", text: "Komentar berhasil dihapus!" });
              $$("threadCommentList").remove(commentId);
            })
            .catch(() => {
              webix.message({ type: "error", text: "Gagal menghapus komentar." });
            });
        }
      }
    });
  }
  
  webix.ready(function () {
    webix.ui({
      container: "index-page",
      rows: [
        threadHeader,
        { height: 12 },
        threadCommentForm,
        { height: 8 },
        threadCommentList,
      ],
    });
  
    loadThreadDetail(id);
  });
  