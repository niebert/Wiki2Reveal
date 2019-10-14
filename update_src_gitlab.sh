#!/bin/sh
echo "-----------------------------------"
echo "--- CALL: $0"
echo "-----------------------------------"

######## MEW REPOSITORY ##########
# Run this script 'update_src_gitlab.sh' in a new directory
# this repository will be created by the script
# Change the following settings for
username="niebert"
reponame="Wiki2Reveal"
exportvar="Wiki2Reveal"
#gittype="gitlab"
gittype="github"
gitsource="https://www.${gittype}.com/${gituser}/${reponame}"
websource="https://${gituser}.${gittype}.io/${reponame}"

######### SOURCE #################
# Downloaded files can come from GitLab and GitHub sources
# so URLs for GitLab and GitHub respositories must be defined
# DO NOT CHANGE THESE NAMES because they define the sources
gitlabuser="niehausbert"
githubuser="niebert"
# Source URL to download from the files:
urlpath4gitlab="https://${gitlabuser}.gitlab.io"
urlpath4github="https://${githubuser}.github.io"
urlpath="$urlpath4gitlab"
webpath="$urlpath4github"
#-- Form this main GitLab repository the files are loaded
reponame4load="loadfile4dom"
exportvar4load="LoadFile4DOM"
downloadsource="https://gitlab.com/${gitlabuser}/${reponame4load}/raw/master"

# Append Path of Repository to source path

# --------------------------------
# Linux OS Settings
# SED: Stream EDit Call differ on GNU Linux and on MacOSX (BSD) Linux

#---GNU Linux Settings------------
#OpSys="GNU Linux"
#sed_call = "sed -i "
# --------------------------------

#---MacOSX BSD Linux Settings-----
OpSys="MacOSX - BSD Linux"
sed_call = "sed -i '' "
# --------------------------------





#defvalue=$gitlabuser
#read -p "Enter your GitHub username for this repository?  " -i "$defvalue" gitlabuser
#defvalue=$reponame
#read -p "Enter your GitHub Repository name?  " -i "$defvalue" reponame
#defvalue=$exportvar
#read -p "Enter your Export Variable/Classname for this repository?  " -i "$defvalue" exportvar

# echo the current Operating System
echo "------------------------------------------------------"
echo "INFOMATION: Local Repository and Operating System"
echo "Operating System: $OpSys"
echo "Repository Name:            $reponame"
echo "Export Variable/Class Name: $exportvar"
echo "Git Username:               $username"
echo "------------------------------------------------------"


# wait 2 seconds to
sleeptime=2

mkdir -p dist
mkdir -p docs
mkdir -p docs/css
mkdir -p docs/js
mkdir -p docs/db
mkdir -p docs/tpl
mkdir -p docs/img
mkdir -p docs/img/icons-svg
mkdir -p docs/schema
mkdir -p src
mkdir -p src/libs
mkdir -p src/html
mkdir -p src/readme
mkdir -p src/css

# codegenerator files (RepoBase "HandleBars4Code")
wget $downloadsource/build.js  -O ./build.js
# wget $downloadsource/build/src/codegen.js  -O ./src/codegen.js

sleep $sleeptime

# Libs for ./src
wget $urlpath4github/jsoneditor2browserify/build/jsoneditor.min.js -O ./src/libs/jsoneditor.min.js
#wget $urlpath4github/json-editor-dorn/js/jsoneditor.min.js -O ./src/libs/jsoneditor.min.js
#wget $urlpath4github/json-editor-dorn/js/jsoneditor.js -O ./src/libs/jsoneditor.js
wget $urlpath4gitlab/LinkParam/js/linkparam.js -O ./src/libs/linkparam.js
# wget $urlpath4gitlab/LinkParam/js/linkparam.min.js -O ./src/libs/linkparam.min.js
# wget https://raw.gitlabusercontent.com/eligrey/FileSaver.js/master/src/FileSaver.js -O ./src/libs/filesaver.js
# wget https://raw.gitlabusercontent.com/eligrey/Blob.js/master/Blob.js -O ./src/libs/blob.js


sleep $sleeptime

wget $urlpath4github/json-editor-dorn/js/blob.js -O ./src/libs/blob.js
# wget https://cdn.rawgit.com/eligrey/canvas-toBlob.js/f1a01896135ab378aa5c0118eadd81da55e698d8/canvas-toBlob.js  -O ./src/libs/canvas2blob.js
wget $urlpath4github/json-editor-dorn/js/filesaver.js -O ./src/libs/filesaver.js
wget $urlpath4github/Handlebars4Code/js/handlebars4code.js -O ./src/libs/handlebars4code.js

#### NPM Files
file="package.json"
if [ -f "./$file" ]
then
	echo "NPM: Check file '$file' - found."
else
	echo "NPM: Check file '$file' - not found - try to download."
  wget "${downloadsource}/${file}"  -O "$file"
  echo "------------------------------------------------------"
  echo "STREAM EDITOR SED: Search/Replace in 'package.json'"
  echo "Operating System: $OpSys"
  echo "Repository Name:            $reponame"
  echo "Export Variable/Class Name: $exportvar"
	echo "Git Username:               $user"
	echo "-----------Main Source Repository------------------"
	echo "Repository: $downloadsource"
	echo "------------------------------------------------------"
  regexdef="'s/$reponame4load/$reponame/g'"
  echo "(1) $sed_call $regexdef ./$file "
  $sed_call $regexdef ./$file
  regexdef="'s/$exportvar4load/$exportvar/g'"
  echo "(2) $sed_call $regexdef ./$file "
  $sed_call $regexdef ./$file
	if [ "$username" = "$gitlabuser" ]; then
    echo "GitLab Username already correct"
	else
    echo "Source Username '$gitlabuser' does NOT match Destination username '$username'"
		regexdef="'s/$gitlabuser/$username/g'"
	  echo "(3) $sed_call $regexdef ./$file "
	  $sed_call $regexdef ./$file
	fi;
  echo "SED-Call: Search/Replace in 'package.json' DONE"
  echo "------------------------------------------------------"
  sleep $sleeptime

fi

#### CODE GENERATION src/libs src/html
codetype="CODEGEN"
file="files4build.js"
if [ -f "./$file" ]
then
	echo "CODEGEN: Check file '$file' - found."
	wget "$downloadsource/$file  -O ./file4buid_$reponame4load.js"
else
	echo "CODEGEN: Check file '$file' - not found - try to download."
  wget $downloadsource/$file  -O ./$file
	sleep $sleeptime
fi

### HTML Code Generation
codetype="HTML"
pathprefix="src/html"
for filename in "body.html" "bodyheader.html" "bodytail.html" "datajson.html" "header.html" "headerlibs.html" "headerscript.html" "tail.html" "tailscript.html" "title.html"
do
  echo "$codetype: check, if file exists or download '$filename'"
  file="./$pathprefix/$filename"
	downloadfile="$downloadsource/$pathprefix/$filename"
  if [ -f "$file" ]
  then
  	echo "   Check ${codetype}-file '$file' - found."
  else
  	echo "   Check ${codetype}-file '$file' - not found - download '$downloadfile'."
    wget $downloadfile  -O $file
		sleep $sleeptime
  fi
done

### README Code Generation
codetype="README"
pathprefix="src/readme"
for filename in "abstract.md" "acknowledgement.md" "background.md" "body.md" "browserify.md" "build_process.md" "demos.md" "doctoc.md" "folderdocs.md" "folderrepo.md" "handlebars4code.md" "headerintro.md" "installation.md" "loadfile4dom_api" "loadfile4dom_documentation.md" "scanfiles.md" "tail.md" "technical.md" "usage.md" "wikiversity.md"
do
	echo "$codetype: check, if file exists or download '$filename'"
  file="./$pathprefix/$filename"
	downloadfile="$downloadsource/$pathprefix/$filename"
	if [ -f "$file" ]
  then
  	echo "   Check ${codetype}-file '$file' - found."
  else
  	echo "   Check ${codetype}-file '$file' - not found - download '$downloadfile'."
    wget $downloadfile  -O $file
		sleep $sleeptime
  fi
done


### SRC/CSS Code Generation
codetype="CSS"
pathprefix="src/css"
for filename in "main.css"
do
	echo "$codetype: check, if file exists or download '$filename'"
  file="./$pathprefix/$filename"
	downloadfile="$downloadsource/$pathprefix/$filename"
  if [ -f "$file" ]
  then
  	echo "   Check ${codetype}-file '$file' - found."
  else
  	echo "   Check ${codetype}-file '$file' - not found - download '$downloadfile'."
    wget $downloadfile  -O $file
		sleep $sleeptime
  fi
done

### DOCS/CSS Extra Style Sheets Code Generation
codetype="CSS"
pathprefix="src/css"
for filename in "bootstrap-theme.css" "bootstrap-theme.css.map"  "bootstrap.css" "bootstrap.css.map"
do
	echo "$codetype: check, if file exists or download '$filename'"
  file="./$pathprefix/$filename"
	downloadfile="$downloadsource/$pathprefix/$filename"
  if [ -f "$file" ]
  then
  	echo "   Check ${codetype}-file '$file' - found."
  else
  	echo "   Check ${codetype}-file '$file' - not found - download '$downloadfile'."
    wget $downloadfile  -O $file
		sleep $sleeptime
  fi
done


### ICONS4MENU for docs/img/icons-svg
codetype="ICONS"
pathprefix="docs"
echo "$codetype: Update scripts for Icons4Menu downloaded - for using the full set of Icons"
wget $urlpath4github/icons4menu/wget_icons.sh  -O ./$pathprefix/wget_icons.sh
wget $urlpath4github/icons4menu/update_wget_icons.sh  -O ./$pathprefix/update_wget_icons.sh

pathprefix="img/icons-svg"
for filename in  "fa-folder-open" "fa-file-save" "gear" "fa-trash" "gear" "edit" "info" "power"
 do
  echo "$codetypeS: check, if file exists or download '$filename'"
  for filepostfix in  "-white.svg" "-black.svg"
    do
      file="./docs/$pathprefix/$filename$filepostfix"
			downloadfile="$urlpath4github/icons4menu/$pathprefix/$filename"
		  if [ -f "$file" ]
		  then
		  	echo "   Check ${codetype}-file '$file' - found."
		  else
		  	echo "   Check ${codetype}-file '$file' - not found - download '$downloadfile'."
		    wget $downloadfile  -O $file
				sleep $sleeptime
		  fi
  done
done
echo "---------------------------------------------------"
echo "              DOWNLOAD FINISHED"
echo "---------------------------------------------------"
echo "Operating System:           $OpSys "
echo "    in case you run the script on other Linux OS"
echo "    please edit $0 and alter SED-call."
echo "Repository Name:            $reponame"
echo "Export Variable/Class Name: $exportvar"
echo "GitLab Username:            $gitlabuser"
echo "-----------Main Source Repository------------------"
echo "Repository: $downloadsource"
echo "---------------------------------------------------"
