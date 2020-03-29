#!/bin/sh
echo "------------------------"
echo "  Script: $0"
echo "------------------------"
Astring="Added feature to package "
BString="Bugfix of package"
Rstring="README.md and documentation updated "
msg="$Bstring"
patchtype="$msg"
if [ $# -eq 0 ]
  then
    echo "WARNING ($0): No arguments supplied - set commit message"
    echo "(A) add new feature"
    echo "(B) bugfix of package"
    echo "(R) README and documentation updated"
    read -e -p "Please Select Patch Type:"  PATCHTYPE
    echo "Patch Type: ($PATCHTYPE)"
    #### Added features
    if  [ $PATCHTYPE == "A" ]
      then
        patchtype="$Astring"
    fi
    if  [ $PATCHTYPE == "a" ]
      then
        patchtype="$Astring"
    fi
    #### Bugfix of Package
    if  [ $PATCHTYPE == "B" ]
      then
        patchtype="$msg"
    fi
    if  [ $PATCHTYPE == "b" ]
      then
        patchtype="$msg"
    fi
    #### Bugfix of Package
    if  [ $PATCHTYPE == "R" ]
      then
        patchtype="$Rstring"
    fi
    if  [ $PATCHTYPE == "r" ]
      then
        patchtype="$Rstring"
    fi
    read -e -p "Please edit Commit Message:"  MESSAGE
    msg="$patchtype - $MESSAGE"
  else
    #### Use commit message provided by parameter
    msg="$1"
fi
echo "Commit Message: '$msg'"
git add *;
git commit -m "$msg"
git push
npm version patch
