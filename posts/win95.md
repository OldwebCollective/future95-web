# Windows 95 Tips & Tricks

Unleash the power of Windows 95 with these tips! Whether you're running it in a VM for nostalgia or you've got an original machine, these tricks will optimize your experience.

## System Performance

### 1. Disable Unnecessary Startup Programs

Reduce startup time and free up resources:

- **StartUp Folder**: Go to `Start → Programs → StartUp`
- **MSConfig**: `Start → Run → msconfig`
- Remove programs you don't use

**Estimated gain:** 15-30 seconds faster boot time

### 2. Optimize Virtual Memory

Windows 95 loves RAM, but you can optimize paging:

1. Right-click on **My Computer**
2. Select **Properties**
3. Go to **Performance** tab
4. Click **Virtual Memory**
5. Set initial and maximum size (usually drive_size/2)

**Pro tip:** Use a separate hard drive for virtual memory for better performance!

### 3. Disable Wallpaper (Performance Boost)

- Right-click on desktop **Properties**
- Set wallpaper to **None**
- **Saves ~2MB RAM** immediately

### 4. Empty the Recycle Bin Regularly

- Right-click Recycle Bin
- **Empty Recycle Bin**
- This can free up 500MB+ on older systems

## File Organization

### Use Long Filenames

Windows 95 supports filenames up to 255 characters (unlike DOS's 8.3 naming):

```
✅ Good: "My_Complete_Business_Report_Final_Draft.doc"
❌ Old: "MYCBRPT.doc"
```

### Create Folders for Organization

Organize by project or category:
```
C:\
├── Documents\
├── Projects\
├── Games\
└── System\
```

## Internet & Networking

### Dial-Up Connection Tips

1. **Optimize buffer settings**:
   - `Control Panel → Modems → General`
   - Increase COM port buffer

2. **Disable animations during browsing**:
   - `Control Panel → Display → Effects`
   - Uncheck all animations

3. **Internet Explorer 4.0 advantages**:
   - Faster rendering than 3.0
   - Better JavaScript support
   - Download from Microsoft

## Gaming Optimization

### DirectX Installation

Many games require DirectX - always install the latest version (6.1 for Win95):

1. Download from `microsoft.com`
2. Run installer
3. Restart computer

### Game Settings

For better gaming performance:
- Close all background programs (use MSConfig)
- Disable wallpaper and screen savers
- Increase video memory allocation for games
- Use DirectDraw accelerator

**Best compatibility games:**
- Star Craft
- Age of Empires
- Doom 95
- Duke Nukem 3D
- Diablo

## Troubleshooting

### Blue Screen of Death (BSOD)

Write down the error code and:
1. Try booting in **Safe Mode** (hold F8 at startup)
2. Uninstall recently added hardware/software
3. Update device drivers
4. Check hard drive for errors: `scandisk /all`

### System Crashes

- **Compress hard drive**: Frees space for system
- **Defragment**: `Start → Programs → Accessories → System Tools`
- **Check memory**: Try reseating RAM sticks

### Registry Fixes

**Important:** Always backup registry first!

```
File → Export → Save as RegFile.reg
```

Then run Windows 95 Registry Checker:
```
Start → Run → scanreg.exe
```

## Networking Tips

### Sharing Files on a Network

1. Right-click folder
2. **Sharing**
3. Enable **Shared As**
4. Set password if desired
5. Access from other machines via **Network Neighborhood**

### Net Commands

Useful network commands in DOS/Command Prompt:
```
net view                    → See computers on network
net share                   → View shares
ping 192.168.1.1           → Test connection
ipconfig /all              → View IP settings
```

## Power User Tricks

### 1. Command Line Shortcuts

- **My Computer**: `explorer ::`
- **Dial-up**: `rasdial.exe [connection name] [password]`
- **System Info**: `msinfo32.exe`

### 2. Batch Files for Automation

Create `.bat` files for repetitive tasks:

```batch
@echo off
del C:\Temp\*.* /Q
echo Temp folder cleaned!
pause
```

Save as `cleanup.bat` and run from Start menu!

### 3. Quick Access to Control Panel

Create shortcut to `control.exe` in `StartUp` folder for instant access

### 4. Task Scheduler (Limited)

Windows 95 doesn't have TaskScheduler, but you can:
- Use `at.exe` command (if installed)
- Schedule programs via StartUp folder
- Use third-party scheduler software

## What NOT to Do

⚠️ **Avoid:**
- **Don't delete system files** (anything with .sys extension)
- **Don't modify registry blindly** - backup first!
- **Don't disable critical startup programs** (Explorer, Taskbar)
- **Don't max out your drive** - keep at least 15% free
- **Don't ignore CHKDSK errors** - fix them immediately

## Resources

- **Microsoft Support**: support.microsoft.com
- **WinWorld**: winworldpc.com (for software archives)
- **Win95 Communities**: Retro gaming forums and subreddits

---

**Happy computing!** Windows 95 was revolutionary for its time, and with these tips, you can keep your system running smoothly. Remember: sometimes the best optimization is knowing when to restart! 🚀
