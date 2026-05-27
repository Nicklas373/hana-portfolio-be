#!/bin/bash

escape_html() {
  echo "$1" | sed \
    -e 's/&/\&amp;/g' \
    -e 's/</\&lt;/g' \
    -e 's/>/\&gt;/g'
}

TG_TOKEN=$TG_TOKEN
TG_CHAT_ID=$TG_CHAT_ID
CONTAINER_NAME=$CONTAINER_NAME
WORKFLOW_URL=$WORKFLOW_URL
IMAGE_NAME=$IMAGE_NAME
STATUS=$STATUS
COMMIT_SHA=$COMMIT_SHA
COMMIT_MSG=$COMMIT_MSG
CLEAN_COMMIT_MSG=$(echo "$COMMIT_MSG" | tr '\n' ' ')
COMMIT_AUTHOR=$COMMIT_AUTHOR
BRANCH=$BRANCH
ENV=$ENV
SHORT_SHA=$(echo $COMMIT_SHA | cut -c1-7)
ESCAPED_COMMIT_MSG=$(escape_html "$CLEAN_COMMIT_MSG")
ESCAPED_AUTHOR=$(escape_html "$COMMIT_AUTHOR")
ESCAPED_BRANCH=$(escape_html "$BRANCH")
ESCAPED_STATUS=$(escape_html "$STATUS")
ESCAPED_IMAGE=$(escape_html "$IMAGE_NAME")
ESCAPED_CONTAINER=$(escape_html "$CONTAINER_NAME")
ESCAPED_URL=$(escape_html "$WORKFLOW_URL")
curdate=$(TZ=Indonesia/Jakarta date)

function bot_template() {
curl -s -X POST https://api.telegram.org/bot$TG_TOKEN/sendMessage -d chat_id=$TG_CHAT_ID -d "parse_mode=HTML" -d text="$(
	for POST in "${@}";
		do
			echo "${POST}"
		done
	)"
}

# Telegram Bot Service || Compiling Message
function bot_message() {
	bot_template	"<b>|| HANA-CI Build Bot ||</b>" \
			"" \
			"<b> Github Workflow Start ! </b>" \
			"" \
			"============= Workflow Information ================" \
			"<b>Workflow :</b><code> $ESCAPED_CONTAINER </code>" \
			"<b>Workflow Name :</b><code> $ESCAPED_IMAGE </code>" \
			"<b>Workflow Detail :</b> <a href='$ESCAPED_URL'>Check here !</a>" \
			"<b>Workflow Step :</b><code> $ESCAPED_STATUS </code>" \
			"<b>Workflow Environment :</b><code> $ENV </code>" \
			"<b>Workflow Start At :</b><code> ${curdate} </code>" \
			"===================================================" \
			"" \
			"============= Branch Information ================" \
			"<b>Branch :</b><code> $ESCAPED_BRANCH </code>" \
			"<b>Commit :</b><code> $SHORT_SHA </code>" \
			"<b>Author :</b><code> $ESCAPED_AUTHOR </code>" \
			"<b>Message :</b> $ESCAPED_COMMIT_MSG" \
			"================================================" \
			""
}

bot_message
